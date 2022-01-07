<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>WESERVE | Registration</title>

    <!-- Bootstrap Core CSS -->
    <link href="<?php echo base_url('assets/theme/vendor/bootstrap/css/bootstrap.min.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('assets/css/style.css'); ?>" rel="stylesheet">

    <link rel="shortcut icon" href="<?php echo base_url('assets/images/favicon.png'); ?>" type="image/x-icon">
    <link rel="icon" href="<?php echo base_url('assets/images/favicon.png'); ?>" type="image/x-icon">

    <link href="<?php echo base_url('assets/theme/vendor/font-awesome/css/font-awesome.min.css'); ?>" rel="stylesheet" type="text/css">

</head>

<body>
    <div class="login-page">
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
            <div class="h6vh"></div>
            <div class="register-bg">
            <!-- <div class="h10vh"></div> -->
                <div class="register-logo-div">
                    <div class="logo-brand text-center">
                        <!-- <i class="fa fa-home fa-fw"></i> -->
                        <img src="<?php echo base_url('assets/images/logo_wobg.png'); ?>" />
                    </div>
                    <div class="logo-text text-center">
                        <!-- <p class="first">WESERVE</p> -->
                        <p class="second">SALON MANAGEMENT SYSTEM</p>
                    </div>
                </div>
                <div class="register-div">
                    <div class="register-panel">
                        <div class="register-panel-header">
                            <h3 class="text-center"><b>Your Weserve journey starts HERE!</b></h3>
                        </div>
                        <div class="panel-body">
                            <form role="form" method="post" action="<?php echo base_url('register'); ?>">
                                <!-- <div class="form-group error error-text text-center"> -->
                                    <i><?php echo @$message; ?></i>
                                <!-- </div> -->
                                <div class="panel-content col-md-12">
                                    <div class="col-md-6">
                                        <div class="floating-label">
                                            <input type="text" class="form-control" name="business_name" required autofocus>
                                            <label>Businesss Name<span class="text-color">*</span></label>
                                        </div>
                                        <div class="floating-label">
                                            <input type="text" class="form-control" name="brgy_address" required autofocus>
                                            <label>Baranggay<span class="text-color">*</span></label>
                                        </div>
                                        <div class="floating-label">
                                            <input type="text" class="form-control" name="lat" required>
                                            <label>Location Latitude<span class="text-color">*</span></label>
                                        </div>
                                        <div class="floating-label">
                                            <input type="email" class="form-control" name="email" required >
                                            <label>Email address<span class="text-color">*</span></label>
                                        </div>
                                        <div class="floating-label">
                                            <input type="text" class="form-control" name="username" required >
                                            <label>Username<span class="text-color">*</span></label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="floating-label">
                                            <input type="text" class="form-control" name="business_description" required>
                                            <label>Description<span class="text-color">*</span></label>
                                        </div>
                                        <div class="floating-label">
                                            <input type="text" class="form-control" name="city_address" required>
                                            <label>Address<span class="text-color">*</span></label>
                                        </div>
                                        <div class="floating-label">
                                            <input type="text" class="form-control" name="long" required>
                                            <label>Longitude<span class="text-color">*</span></label>
                                        </div>
                                        <div class="floating-label">
                                            <input type="text" class="form-control" name="phone_number" required >
                                            <label>Phone Number<span class="text-color">*</span></label>
                                        </div>
                                        <div class="floating-label">
                                            <input type="password" class="form-control" name="password" required>
                                            <label>Password<span class="text-color">*</span></label>
                                        </div>
                                    </div>
                                </div>
                                <input type="submit" value="REGISTER" class="form-control submit-form">
                                <span>Already have an Account?<a href="<?php echo base_url('login');?>"><i>Login here</i></a>.</span>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h30vh"></div>
        </div>
    </div>
</body>

</html>
