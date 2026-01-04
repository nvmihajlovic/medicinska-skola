<?php
// Конфигурација за admin панел

// Кориснички налози (username => password hash)
// За production, користити password_hash() и password_verify()
$admin_users = [
    'admin' => password_hash('medicinska2024', PASSWORD_DEFAULT),
    'urednik' => password_hash('urednik123', PASSWORD_DEFAULT)
];

// Путање
define('DATA_DIR', __DIR__ . '/data/');
define('ARTICLES_FILE', DATA_DIR . 'articles.json');
define('ROOT_DIR', dirname(__DIR__) . '/');
define('TEMPLATE_FILE', __DIR__ . '/template-article.html');

// Категорије вести
$categories = [
    'Школске вести',
    'Спорт',
    'Култура',
    'Хуманитарне акције',
    'Донација крви',
    'Еколошке акције',
    'Екстракурикуларне активности',
    'Образовање',
    'Еразмус+ пројекти'
];

// Badges за категорије
$category_badges = [
    'Школске вести' => 'badge-blue',
    'Спорт' => 'badge-green',
    'Култура' => 'badge-purple',
    'Хуманитарне акције' => 'badge-red',
    'Донација крви' => 'badge-red',
    'Еколошке акције' => 'badge-green',
    'Екстракурикуларне активности' => 'badge-blue',
    'Образовање' => 'badge-purple',
    'Еразмус+ пројекти' => 'badge-orange'
];

// Иницијализација data фолдера
if (!file_exists(DATA_DIR)) {
    mkdir(DATA_DIR, 0755, true);
}

if (!file_exists(ARTICLES_FILE)) {
    file_put_contents(ARTICLES_FILE, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}
