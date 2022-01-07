<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>WESERVE | Login</title>

    <!-- Bootstrap Core CSS -->
    <link href="<?php echo base_url('assets/theme/vendor/bootstrap/css/bootstrap.min.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('assets/css/style.css'); ?>" rel="stylesheet">

    <link rel="shortcut icon" href="<?php echo base_url('assets/images/favicon.png'); ?>" type="image/x-icon">
    <link rel="icon" href="<?php echo base_url('assets/images/favicon.png'); ?>" type="image/x-icon">

    <link href="<?php echo base_url('assets/theme/vendor/font-awesome/css/font-awesome.min.css'); ?>" rel="stylesheet" type="text/css">

</head>

<body>
    <!-- <div class="row"> -->
    <div class="login-page col-md-12">
        <div class="dark-bg"></div>
        <div class="background-images" style="opacity:0.3">
        <!-- <image src="assets/images/logo.png" style="width:100rem;height:55rem;opacity: 0.3;"> -->
            <img src="<?php echo base_url('assets/images/logo.png'); ?>" />
            <img src="<?php echo base_url('assets/images/logo.png'); ?>" />
            <img src="<?php echo base_url('assets/images/logo.png'); ?>" />
            <img src="<?php echo base_url('assets/images/logo.png'); ?>" />
            <img src="<?php echo base_url('assets/images/logo.png'); ?>" />
        </div>
        <div class="login">
            <div class="h10vh"></div>
            <div class="login-bg">
                <div class="logo-div">
                    <div class="logo-brand text-center">
                        <!-- <i class="fa fa-home fa-fw"></i> -->
                        <img src="<?php echo base_url('assets/images/logo_wobg.png'); ?>" />
                    </div>
                    <div class="logo-text text-center">
                        <p class="second">CUSTOMER</p>
                        <p class="second">SALON MANAGEMENT SYSTEM</p>
                    </div>
                </div>
                <div class="login-div">
                    <div class="panel">
                        <div class="panel-header">
                            <h3 class="text-center">Login Here!</h3>
                        </div>
                        <div class="panel-body">
                            <form role="form" method="post" action="<?php echo base_url('login_customer'); ?>">
                            <span><a href="<?php echo base_url('login');?>"><i>Click to login as service provider.</i></a>.</span>
                                <div class="form-group error error-text text-center">
                                    <i><?php echo @$message; ?></i>
                                </div>
                                <div class="floating-label">
                                    <input type="text" class="form-control" name="username" required autofocus>
                                    <label>username</label>
                                </div>
                                <div class="floating-label">
                                    <input type="password" class="form-control" name="password" required>
                                    <label>password</label>
                                </div>
                                <input type="submit" value="LOGIN" class="form-control submit-form">
                                <span>New to weserve?<a href="<?php echo base_url('register_customer');?>"><i>Register here</i></a>.</span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h30vh"></div>
        </div>
    </div>
    <!-- </div> -->
</body>

</html>
