<?php
// Једноставан админ систем за додавање вести
session_start();

// Основна заштита (замени са правом аутентификацијом)
$admin_password = "medicinska2024"; // Промени ово!

if (!isset($_SESSION['admin_logged_in']) && $_POST['password'] !== $admin_password) {
    if ($_POST['password']) {
        echo "Погрешна лозинка!";
    }
    ?>
    <!DOCTYPE html>
    <html lang="sr">
    <head>
        <meta charset="UTF-8">
        <title>Админ панел - Додај вест</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 500px; margin: 100px auto; padding: 20px; }
            input, textarea, button { width: 100%; padding: 10px; margin: 10px 0; }
            button { background: #4a90e2; color: white; border: none; cursor: pointer; }
        </style>
    </head>
    <body>
        <h2>Пријави се као админ</h2>
        <form method="POST">
            <input type="password" name="password" placeholder="Лозинка" required>
            <button type="submit">Пријави се</button>
        </form>
    </body>
    </html>
    <?php
    exit;
}

$_SESSION['admin_logged_in'] = true;

// Процесирај форму
if ($_POST && isset($_POST['title'])) {
    $title = htmlspecialchars($_POST['title']);
    $slug = strtolower(str_replace([' ', 'ć', 'č', 'š', 'ž', 'đ'], ['-', 'c', 'c', 's', 'z', 'd'], $title));
    $slug = preg_replace('/[^a-z0-9-]/', '', $slug);
    $content = htmlspecialchars($_POST['content']);
    $category = htmlspecialchars($_POST category']);
    $date = date('d. F Y.');
    
    // Генериши HTML страницу
    $html_template = file_get_contents('../news-article.html');
    
    // Замени плејсхолдере
    $html_content = str_replace([
        '{{TITLE}}',
        '{{CONTENT}}',
        '{{DATE}}',
        '{{CATEGORY}}'
    ], [
        $title,
        nl2br($content),
        $date,
        $category
    ], $html_template);
    
    // Сачувај нову страницу
    file_put_contents("../{$slug}.html", $html_content);
    
    // Ажурирај news-generator.js
    $news_data = [
        'slug' => $slug,
        'title' => $title,
        'date' => $date,
        'category' => $category
    ];
    
    echo "<p style='color: green;'>Вест је успешно додата: <a href='../{$slug}.html' target='_blank'>{$title}</a></p>";
}
?>

<!DOCTYPE html>
<html lang="sr">
<head>
    <meta charset="UTF-8">
    <title>Админ панел - Додај нову вест</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 20px auto; padding: 20px; }
        input, textarea, select, button { width: 100%; padding: 10px; margin: 10px 0; }
        button { background: #4a90e2; color: white; border: none; cursor: pointer; }
        textarea { height: 200px; }
        .logout { float: right; background: #e74c3c; }
    </style>
</head>
<body>
    <a href="?logout=1" class="logout" onclick="return confirm('Да ли си сигуран?')">Одјави се</a>
    <h1>Додај нову вест</h1>
    
    <form method="POST">
        <input type="text" name="title" placeholder="Наслов вести" required>
        
        <select name="category" required>
            <option value="">Изабери категорију</option>
            <option value="Дан планете Земље">Дан планете Земље</option>
            <option value="Донација крви">Донација крви</option>
            <option value="Спорт">Спорт</option>
            <option value="Култура">Култура</option>
            <option value="Образовање">Образовање</option>
            <option value="Хуманитарне акције">Хуманитарне акције</option>
        </select>
        
        <textarea name="content" placeholder="Садржај вести..." required></textarea>
        
        <button type="submit">Објави вест</button>
    </form>
    
    <hr>
    <h3>Упутство:</h3>
    <ul>
        <li>Унеси наслов и садржај вести</li>
        <li>Систем ће аутоматски направити HTML страницу</li>
        <li>Страница ће бити доступна на: naziv-vesti.html</li>
        <li>Ручно додај вест на главну страницу (index.html)</li>
    </ul>
</body>
</html>

<?php
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: add-news.php');
    exit;
}
?>