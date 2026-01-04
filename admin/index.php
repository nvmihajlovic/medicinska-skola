<?php
session_start();
require_once 'config.php';

// Провера да ли је корисник улогован
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: login.php');
    exit;
}

// Учитај чланке
$articles = json_decode(file_get_contents(ARTICLES_FILE), true) ?? [];

// Сортирај по датуму (најновије прво)
usort($articles, function ($a, $b) {
    return strtotime($b['date']) - strtotime($a['date']);
});
?>
<!DOCTYPE html>
<html lang="sr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Admin панел</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f7fa;
            color: #333;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header h1 {
            font-size: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .user-info span {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: white;
            color: #667eea;
            border: 2px solid white;
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.9);
        }

        .btn-danger {
            background: #e74c3c;
            color: white;
            font-size: 13px;
            padding: 6px 12px;
        }

        .btn-danger:hover {
            background: #c0392b;
        }

        .btn-edit {
            background: #3498db;
            color: white;
            font-size: 13px;
            padding: 6px 12px;
        }

        .btn-edit:hover {
            background: #2980b9;
        }

        .container {
            max-width: 1400px;
            margin: 30px auto;
            padding: 0 30px;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .stat-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .stat-icon.blue {
            background: #e3f2fd;
            color: #2196f3;
        }

        .stat-icon.green {
            background: #e8f5e9;
            color: #4caf50;
        }

        .stat-icon.purple {
            background: #f3e5f5;
            color: #9c27b0;
        }

        .stat-info h3 {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 5px;
        }

        .stat-info p {
            color: #666;
            font-size: 14px;
        }

        .actions-bar {
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .actions-bar h2 {
            font-size: 20px;
        }

        .articles-table {
            background: white;
            border-radius: 15px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            overflow: hidden;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead {
            background: #f8f9fa;
        }

        th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            color: #666;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        td {
            padding: 15px;
            border-top: 1px solid #f0f0f0;
        }

        tr:hover {
            background: #f8f9fa;
        }

        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }

        .badge-blue {
            background: #e3f2fd;
            color: #1976d2;
        }

        .badge-green {
            background: #e8f5e9;
            color: #388e3c;
        }

        .badge-purple {
            background: #f3e5f5;
            color: #7b1fa2;
        }

        .badge-red {
            background: #ffebee;
            color: #c62828;
        }

        .badge-orange {
            background: #fff3e0;
            color: #f57c00;
        }

        .article-actions {
            display: flex;
            gap: 8px;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #999;
        }

        .empty-state i {
            font-size: 64px;
            margin-bottom: 20px;
            opacity: 0.5;
        }

        .article-title {
            font-weight: 600;
            color: #333;
            max-width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    </style>
</head>

<body>
    <header class="header">
        <h1>
            <i class="fas fa-newspaper"></i>
            Управљање вестима
        </h1>
        <div class="user-info">
            <span>
                <i class="fas fa-user"></i>
                <?php echo htmlspecialchars($_SESSION['admin_username']); ?>
            </span>
            <a href="?logout=1" class="btn btn-secondary">
                <i class="fas fa-sign-out-alt"></i>
                Одјави се
            </a>
        </div>
    </header>

    <div class="container">
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon blue">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="stat-info">
                    <h3><?php echo count($articles); ?></h3>
                    <p>Укупно чланака</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon green">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-info">
                    <h3><?php echo count(array_filter($articles, function ($a) {
                            return (time() - strtotime($a['date'])) < 604800;
                        })); ?></h3>
                    <p>Нових ове недеље</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon purple">
                    <i class="fas fa-tags"></i>
                </div>
                <div class="stat-info">
                    <h3><?php echo count(array_unique(array_column($articles, 'category'))); ?></h3>
                    <p>Категорија</p>
                </div>
            </div>
        </div>

        <div class="actions-bar">
            <h2><i class="fas fa-list"></i> Сви чланци</h2>
            <a href="manage-article.php" class="btn btn-primary">
                <i class="fas fa-plus"></i>
                Додај нови чланак
            </a>
        </div>

        <div class="articles-table">
            <?php if (empty($articles)): ?>
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <h3>Још нема чланака</h3>
                    <p>Кликните на "Додај нови чланак" да креирате први чланак</p>
                </div>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>Наслов</th>
                            <th>Категорија</th>
                            <th>Датум</th>
                            <th>Линк</th>
                            <th>Акције</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($articles as $article): ?>
                            <tr>
                                <td>
                                    <div class="article-title" title="<?php echo htmlspecialchars($article['title']); ?>">
                                        <?php echo htmlspecialchars($article['title']); ?>
                                    </div>
                                </td>
                                <td>
                                    <span class="badge <?php echo $category_badges[$article['category']] ?? 'badge-blue'; ?>">
                                        <?php echo htmlspecialchars($article['category']); ?>
                                    </span>
                                </td>
                                <td><?php echo date('d.m.Y', strtotime($article['date'])); ?></td>
                                <td>
                                    <a href="../<?php echo htmlspecialchars($article['slug']); ?>.html" target="_blank" style="color: #667eea;">
                                        <i class="fas fa-external-link-alt"></i> Отвори
                                    </a>
                                </td>
                                <td>
                                    <div class="article-actions">
                                        <a href="manage-article.php?edit=<?php echo urlencode($article['id']); ?>" class="btn btn-edit">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="delete-article.php?id=<?php echo urlencode($article['id']); ?>"
                                            class="btn btn-danger"
                                            onclick="return confirm('Да ли сте сигурни да желите да обришете овај чланак?');">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
    </div>
</body>

</html>