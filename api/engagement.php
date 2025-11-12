<?php
// Систем за лајкове и прегледе
header('Content-Type: application/json');

// Конекција са базом (промени креденцијале)
$host = 'localhost';
$dbname = 'medicinska_db';
$username = 'your_username';
$password = 'your_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['error' => 'Грешка при конекцији са базом']));
}

$action = $_GET['action'] ?? '';
$article_slug = $_GET['article'] ?? '';
$user_ip = $_SERVER['REMOTE_ADDR'];

switch ($action) {
    case 'view':
        // Увећај број прегледа
        $stmt = $pdo->prepare("UPDATE articles SET views = views + 1 WHERE slug = ?");
        $stmt->execute([$article_slug]);

        // Врати тренутне бројеве
        $stmt = $pdo->prepare("SELECT views, likes FROM articles WHERE slug = ?");
        $stmt->execute([$article_slug]);
        $result = $stmt->fetch();

        echo json_encode([
            'views' => $result['views'] ?? 0,
            'likes' => $result['likes'] ?? 0
        ]);
        break;

    case 'like':
        // Провери да ли је корисник већ лајковао
        $stmt = $pdo->prepare("SELECT id FROM article_likes WHERE article_id = (SELECT id FROM articles WHERE slug = ?) AND ip_address = ?");
        $stmt->execute([$article_slug, $user_ip]);

        if ($stmt->fetch()) {
            // Уклони лајк
            $stmt = $pdo->prepare("DELETE FROM article_likes WHERE article_id = (SELECT id FROM articles WHERE slug = ?) AND ip_address = ?");
            $stmt->execute([$article_slug, $user_ip]);

            $stmt = $pdo->prepare("UPDATE articles SET likes = likes - 1 WHERE slug = ?");
            $stmt->execute([$article_slug]);

            $liked = false;
        } else {
            // Додај лајк
            $stmt = $pdo->prepare("INSERT INTO article_likes (article_id, ip_address) VALUES ((SELECT id FROM articles WHERE slug = ?), ?)");
            $stmt->execute([$article_slug, $user_ip]);

            $stmt = $pdo->prepare("UPDATE articles SET likes = likes + 1 WHERE slug = ?");
            $stmt->execute([$article_slug]);

            $liked = true;
        }

        // Врати ажуриране бројеве
        $stmt = $pdo->prepare("SELECT views, likes FROM articles WHERE slug = ?");
        $stmt->execute([$article_slug]);
        $result = $stmt->fetch();

        echo json_encode([
            'views' => $result['views'] ?? 0,
            'likes' => $result['likes'] ?? 0,
            'liked' => $liked
        ]);
        break;

    case 'get':
        // Само врати тренутне бројеве
        $stmt = $pdo->prepare("SELECT views, likes FROM articles WHERE slug = ?");
        $stmt->execute([$article_slug]);
        $result = $stmt->fetch();

        // Провери да ли је лајковано
        $stmt = $pdo->prepare("SELECT id FROM article_likes WHERE article_id = (SELECT id FROM articles WHERE slug = ?) AND ip_address = ?");
        $stmt->execute([$article_slug, $user_ip]);
        $liked = $stmt->fetch() ? true : false;

        echo json_encode([
            'views' => $result['views'] ?? 0,
            'likes' => $result['likes'] ?? 0,
            'liked' => $liked
        ]);
        break;

    default:
        echo json_encode(['error' => 'Непозната акција']);
}
