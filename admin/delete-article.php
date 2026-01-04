<?php
session_start();
require_once 'config.php';

// Провера да ли је корисник улогован
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

// Провера ID-а
if (!isset($_GET['id'])) {
    header('Location: index.php');
    exit;
}

$article_id = $_GET['id'];

// Учитај чланке
$articles = json_decode(file_get_contents(ARTICLES_FILE), true) ?? [];

// Пронађи чланак
$article_key = array_search($article_id, array_column($articles, 'id'));

if ($article_key === false) {
    header('Location: index.php');
    exit;
}

$article = $articles[$article_key];

// Обриши HTML фајл
$html_file = ROOT_DIR . $article['slug'] . '.html';
if (file_exists($html_file)) {
    unlink($html_file);
}

// Уклони чланак из низа
array_splice($articles, $article_key, 1);

// Сачувај ажуриран JSON
file_put_contents(ARTICLES_FILE, json_encode($articles, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Редирект назад
header('Location: index.php?deleted=' . urlencode($article['title']));
exit;
