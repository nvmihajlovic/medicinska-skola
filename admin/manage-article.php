<?php
session_start();
require_once 'config.php';

// Провера да ли је корисник улогован
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

// Учитај чланке
$articles = json_decode(file_get_contents(ARTICLES_FILE), true) ?? [];

// Режим: додавање или измена
$edit_mode = false;
$article_data = [
    'id' => '',
    'title' => '',
    'slug' => '',
    'category' => '',
    'date' => date('Y-m-d'),
    'content' => '',
    'image_type' => 'placeholder',
    'image_url' => '',
    'breadcrumb_title' => ''
];

if (isset($_GET['edit'])) {
    $edit_mode = true;
    $edit_id = $_GET['edit'];
    $article_key = array_search($edit_id, array_column($articles, 'id'));

    if ($article_key !== false) {
        $article_data = $articles[$article_key];
    } else {
        header('Location: index.php');
        exit;
    }
}

// Обрада форме
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_article'])) {
    $title = trim($_POST['title']);
    $category = $_POST['category'];
    $date = $_POST['date'];
    $content = $_POST['content']; // Не користи htmlspecialchars јер желимо HTML
    $image_type = $_POST['image_type'];
    $image_url = trim($_POST['image_url']);
    $breadcrumb_title = trim($_POST['breadcrumb_title']) ?: $title;

    // Генериши slug
    $slug = strtolower(trim($title));
    $slug = str_replace(
        ['а', 'б', 'в', 'г', 'д', 'ђ', 'е', 'ж', 'з', 'и', 'ј', 'к', 'л', 'љ', 'м', 'н', 'њ', 'о', 'п', 'р', 'с', 'т', 'ћ', 'у', 'ф', 'х', 'ц', 'ч', 'џ', 'ш'],
        ['a', 'b', 'v', 'g', 'd', 'dj', 'e', 'z', 'z', 'i', 'j', 'k', 'l', 'lj', 'm', 'n', 'nj', 'o', 'p', 'r', 's', 't', 'c', 'u', 'f', 'h', 'c', 'c', 'dz', 's'],
        $slug
    );
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    $slug = trim($slug, '-');

    // ID чланка
    if ($edit_mode) {
        $article_id = $_POST['article_id'];
    } else {
        $article_id = uniqid('article_', true);
    }

    // Формирај податке чланка
    $new_article = [
        'id' => $article_id,
        'title' => $title,
        'slug' => $slug,
        'category' => $category,
        'date' => $date,
        'content' => $content,
        'image_type' => $image_type,
        'image_url' => $image_url,
        'breadcrumb_title' => $breadcrumb_title
    ];

    // Ажурирај или додај
    if ($edit_mode) {
        $article_key = array_search($article_id, array_column($articles, 'id'));
        if ($article_key !== false) {
            $articles[$article_key] = $new_article;
        }
    } else {
        $articles[] = $new_article;
    }

    // Сачувај у JSON
    file_put_contents(ARTICLES_FILE, json_encode($articles, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    // Генериши HTML страницу
    generateArticleHTML($new_article);

    // Редирект на dashboard са успехом
    header('Location: index.php?success=' . urlencode($title));
    exit;
}

// Функција за генерисање HTML чланка
function generateArticleHTML($article)
{
    global $category_badges;

    $template = file_get_contents(TEMPLATE_FILE);

    // Featured image
    $featured_image = '';
    if ($article['image_type'] === 'url' && !empty($article['image_url'])) {
        $featured_image = '<img src="' . htmlspecialchars($article['image_url']) . '" alt="' . htmlspecialchars($article['title']) . '" style="width: 100%; border-radius: 15px;">';
    } else {
        $featured_image = '
        <div class="image-placeholder blue-placeholder" role="img" aria-label="' . htmlspecialchars($article['title']) . '">
            <i class="fas fa-hospital"></i>
            <p>' . htmlspecialchars($article['category']) . '</p>
        </div>';
    }

    // Badge класа
    $badge_class = $category_badges[$article['category']] ?? 'badge-blue';

    // Форматирај датум
    $date_formatted = date('d. F Y.', strtotime($article['date']));
    $date_formatted = str_replace(
        ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар'],
        $date_formatted
    );

    // Замени плацехолдере
    $html = str_replace(
        ['{{TITLE}}', '{{BREADCRUMB_TITLE}}', '{{CATEGORY}}', '{{BADGE_CLASS}}', '{{DATE}}', '{{FEATURED_IMAGE}}', '{{CONTENT}}'],
        [
            htmlspecialchars($article['title']),
            htmlspecialchars($article['breadcrumb_title']),
            htmlspecialchars($article['category']),
            $badge_class,
            $date_formatted,
            $featured_image,
            $article['content'] // Овде не користимо htmlspecialchars јер је садржај већ HTML
        ],
        $template
    );

    // Сачувај HTML фајл
    $filename = ROOT_DIR . $article['slug'] . '.html';
    file_put_contents($filename, $html);
}
?>
<!DOCTYPE html>
<html lang="sr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $edit_mode ? 'Измени' : 'Додај'; ?> чланак - Admin панел</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
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

        .btn-secondary {
            background: white;
            color: #667eea;
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.9);
        }

        .btn-primary {
            background: #667eea;
            color: white;
            font-size: 16px;
            padding: 14px 28px;
        }

        .btn-primary:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .container {
            max-width: 1200px;
            margin: 30px auto;
            padding: 0 30px;
        }

        .form-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            padding: 40px;
        }

        .form-group {
            margin-bottom: 25px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
            font-size: 14px;
        }

        .form-group input[type="text"],
        .form-group input[type="date"],
        .form-group select {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 15px;
            transition: all 0.3s;
            font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .form-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 20px;
        }

        .form-actions {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
            margin-top: 30px;
            padding-top: 30px;
            border-top: 2px solid #f0f0f0;
        }

        .info-box {
            background: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            font-size: 14px;
            color: #1565c0;
        }

        .info-box i {
            margin-right: 8px;
        }

        .radio-group {
            display: flex;
            gap: 20px;
            margin-top: 10px;
        }

        .radio-group label {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: normal;
            cursor: pointer;
        }

        .radio-group input[type="radio"] {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }

        #image_url_group {
            display: none;
        }
    </style>
</head>

<body>
    <header class="header">
        <h1>
            <i class="fas fa-<?php echo $edit_mode ? 'edit' : 'plus'; ?>"></i>
            <?php echo $edit_mode ? 'Измени' : 'Додај нови'; ?> чланак
        </h1>
        <a href="index.php" class="btn btn-secondary">
            <i class="fas fa-arrow-left"></i>
            Назад на Dashboard
        </a>
    </header>

    <div class="container">
        <div class="form-card">
            <div class="info-box">
                <i class="fas fa-info-circle"></i>
                <strong>Напомена:</strong> Систем ће аутоматски генерисати HTML страницу на основу унетих података.
                Користите едитор за форматирање текста (bold, italic, листе, наслове итд.).
            </div>

            <form method="POST" action="">
                <?php if ($edit_mode): ?>
                    <input type="hidden" name="article_id" value="<?php echo htmlspecialchars($article_data['id']); ?>">
                <?php endif; ?>

                <div class="form-group">
                    <label for="title">
                        <i class="fas fa-heading"></i> Наслов чланка *
                    </label>
                    <input type="text" id="title" name="title" required
                        value="<?php echo htmlspecialchars($article_data['title']); ?>"
                        placeholder="Нпр: Школска спортска такмичења и резултати">
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label for="category">
                            <i class="fas fa-tag"></i> Категорија *
                        </label>
                        <select id="category" name="category" required>
                            <option value="">Изабери категорију</option>
                            <?php foreach ($categories as $cat): ?>
                                <option value="<?php echo htmlspecialchars($cat); ?>"
                                    <?php echo $article_data['category'] === $cat ? 'selected' : ''; ?>>
                                    <?php echo htmlspecialchars($cat); ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="date">
                            <i class="fas fa-calendar"></i> Датум *
                        </label>
                        <input type="date" id="date" name="date" required
                            value="<?php echo htmlspecialchars($article_data['date']); ?>">
                    </div>

                    <div class="form-group">
                        <label for="breadcrumb_title">
                            <i class="fas fa-map-signs"></i> Крумба наслов
                        </label>
                        <input type="text" id="breadcrumb_title" name="breadcrumb_title"
                            value="<?php echo htmlspecialchars($article_data['breadcrumb_title']); ?>"
                            placeholder="Краћи наслов">
                    </div>
                </div>

                <div class="form-group">
                    <label>
                        <i class="fas fa-image"></i> Истакнута слика
                    </label>
                    <div class="radio-group">
                        <label>
                            <input type="radio" name="image_type" value="placeholder"
                                <?php echo $article_data['image_type'] === 'placeholder' ? 'checked' : ''; ?>
                                onchange="toggleImageUrl()">
                            Placeholder (иконица)
                        </label>
                        <label>
                            <input type="radio" name="image_type" value="url"
                                <?php echo $article_data['image_type'] === 'url' ? 'checked' : ''; ?>
                                onchange="toggleImageUrl()">
                            URL слике
                        </label>
                    </div>
                </div>

                <div class="form-group" id="image_url_group" <?php echo $article_data['image_type'] === 'url' ? 'style="display:block;"' : ''; ?>>
                    <label for="image_url">
                        <i class="fas fa-link"></i> URL слике
                    </label>
                    <input type="text" id="image_url" name="image_url"
                        value="<?php echo htmlspecialchars($article_data['image_url']); ?>"
                        placeholder="https://example.com/slika.jpg">
                </div>

                <div class="form-group">
                    <label for="content">
                        <i class="fas fa-align-left"></i> Садржај чланка *
                    </label>
                    <textarea id="content" name="content" rows="15"><?php echo htmlspecialchars($article_data['content']); ?></textarea>
                </div>

                <div class="form-actions">
                    <a href="index.php" class="btn btn-secondary">
                        <i class="fas fa-times"></i>
                        Откажи
                    </a>
                    <button type="submit" name="save_article" class="btn btn-primary">
                        <i class="fas fa-save"></i>
                        <?php echo $edit_mode ? 'Сачувај измене' : 'Објави чланак'; ?>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // TinyMCE Editor за богато форматирање текста
        tinymce.init({
            selector: '#content',
            height: 500,
            menubar: true,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code',
            content_style: 'body { font-family: Segoe UI, Arial, sans-serif; font-size: 16px; }',
            language: 'sr',
            branding: false
        });

        function toggleImageUrl() {
            const imageType = document.querySelector('input[name="image_type"]:checked').value;
            const imageUrlGroup = document.getElementById('image_url_group');

            if (imageType === 'url') {
                imageUrlGroup.style.display = 'block';
            } else {
                imageUrlGroup.style.display = 'none';
            }
        }
    </script>
</body>

</html>