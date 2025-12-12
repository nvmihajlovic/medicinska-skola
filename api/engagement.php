<?php
// Систем за лајкове и прегледе - JSON Storage
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$dataFile = __DIR__ . '/../data/engagement-data.json';

// Функција за учитавање података
function loadData($file)
{
    if (!file_exists($file)) {
        $initialData = [
            'donacija-krvi' => ['views' => 0, 'likes' => 0, 'likedBy' => []],
            'dan-planete' => ['views' => 0, 'likes' => 0, 'likedBy' => []],
            'fruska-gora-maraton' => ['views' => 0, 'likes' => 0, 'likedBy' => []],
            'humanitarna-akcija' => ['views' => 0, 'likes' => 0, 'likedBy' => []],
            'svetski-dan-poezije' => ['views' => 0, 'likes' => 0, 'likedBy' => []],
            'strucna-praksa' => ['views' => 0, 'likes' => 0, 'likedBy' => []]
        ];
        file_put_contents($file, json_encode($initialData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        return $initialData;
    }
    return json_decode(file_get_contents($file), true);
}

// Функција за чување података
function saveData($file, $data)
{
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Генериши јединствени ID корисника (IP + User Agent)
function getUserId()
{
    return md5($_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
}

$action = $_GET['action'] ?? '';
$article_slug = $_GET['article'] ?? '';
$userId = getUserId();

$data = loadData($dataFile);

// Инициализуј чланак ако не постоји
if (!isset($data[$article_slug])) {
    $data[$article_slug] = ['views' => 0, 'likes' => 0, 'likedBy' => []];
}

switch ($action) {
    case 'view':
        // Увећај број прегледа само први пут
        $viewKey = 'viewed_' . $article_slug;
        if (!isset($_SESSION)) session_start();

        if (!isset($_SESSION[$viewKey])) {
            $data[$article_slug]['views']++;
            $_SESSION[$viewKey] = true;
            saveData($dataFile, $data);
        }

        echo json_encode([
            'views' => $data[$article_slug]['views'],
            'likes' => $data[$article_slug]['likes'],
            'liked' => in_array($userId, $data[$article_slug]['likedBy'])
        ]);
        break;

    case 'like':
        $likedBy = &$data[$article_slug]['likedBy'];
        $liked = in_array($userId, $likedBy);

        if ($liked) {
            // Уклони лајк
            $likedBy = array_values(array_diff($likedBy, [$userId]));
            $data[$article_slug]['likes']--;
            $liked = false;
        } else {
            // Додај лајк
            $likedBy[] = $userId;
            $data[$article_slug]['likes']++;
            $liked = true;
        }

        saveData($dataFile, $data);

        echo json_encode([
            'views' => $data[$article_slug]['views'],
            'likes' => $data[$article_slug]['likes'],
            'liked' => $liked
        ]);
        break;

    case 'get':
        echo json_encode([
            'views' => $data[$article_slug]['views'],
            'likes' => $data[$article_slug]['likes'],
            'liked' => in_array($userId, $data[$article_slug]['likedBy'])
        ]);
        break;

    default:
        echo json_encode(['error' => 'Непозната акција']);
}
