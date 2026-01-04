<?php
session_start();
require_once 'config.php';

// Обрада login форме
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if (isset($admin_users[$username]) && password_verify($password, $admin_users[$username])) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        header('Location: index.php');
        exit;
    } else {
        $error = 'Погрешно корисничко име или лозинка!';
    }
}

// Ако је већ улогован, редирект на dashboard
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="sr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Пријава - Admin панел</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .login-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 420px;
            padding: 40px;
            animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .login-header {
            text-align: center;
            margin-bottom: 35px;
        }

        .login-header i {
            font-size: 50px;
            color: #667eea;
            margin-bottom: 15px;
        }

        .login-header h1 {
            color: #333;
            font-size: 28px;
            margin-bottom: 8px;
        }

        .login-header p {
            color: #666;
            font-size: 14px;
        }

        .form-group {
            margin-bottom: 25px;
            position: relative;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #333;
            font-weight: 600;
            font-size: 14px;
        }

        .form-group i {
            position: absolute;
            left: 15px;
            top: 42px;
            color: #999;
        }

        .form-group input {
            width: 100%;
            padding: 14px 15px 14px 45px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 15px;
            transition: all 0.3s;
            outline: none;
        }

        .form-group input:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .btn-login {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 10px;
        }

        .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-login:active {
            transform: translateY(0);
        }

        .error-message {
            background: #fee;
            border: 1px solid #fcc;
            color: #c33;
            padding: 12px 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            display: flex;
            align-items: center;
            animation: shake 0.5s;
        }

        .error-message i {
            margin-right: 10px;
        }

        @keyframes shake {

            0%,
            100% {
                transform: translateX(0);
            }

            25% {
                transform: translateX(-10px);
            }

            75% {
                transform: translateX(10px);
            }
        }

        .login-footer {
            text-align: center;
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #eee;
            color: #999;
            font-size: 13px;
        }

        .credentials-hint {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin-top: 20px;
            border-radius: 5px;
            font-size: 13px;
            color: #666;
        }

        .credentials-hint strong {
            color: #333;
            display: block;
            margin-bottom: 8px;
        }

        .credentials-hint code {
            background: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            color: #667eea;
        }
    </style>
</head>

<body>
    <div class="login-container">
        <div class="login-header">
            <i class="fas fa-user-shield"></i>
            <h1>Admin панел</h1>
            <p>Медицинска школа - Управљање вестима</p>
        </div>

        <?php if (isset($error)): ?>
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php endif; ?>

        <form method="POST" action="">
            <div class="form-group">
                <label for="username">Корисничко име</label>
                <i class="fas fa-user"></i>
                <input type="text" id="username" name="username" required autofocus placeholder="Унесите корисничко име">
            </div>

            <div class="form-group">
                <label for="password">Лозинка</label>
                <i class="fas fa-lock"></i>
                <input type="password" id="password" name="password" required placeholder="Унесите лозинку">
            </div>

            <button type="submit" name="login" class="btn-login">
                <i class="fas fa-sign-in-alt"></i> Пријави се
            </button>
        </form>

        <div class="credentials-hint">
            <strong><i class="fas fa-info-circle"></i> Тест налози:</strong>
            Корисник: <code>admin</code> / Лозинка: <code>medicinska2024</code><br>
            Корисник: <code>urednik</code> / Лозинка: <code>urednik123</code>
        </div>

        <div class="login-footer">
            <i class="fas fa-shield-alt"></i> Заштићен систем - само за овлашћене кориснике
        </div>
    </div>
</body>

</html>