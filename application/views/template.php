<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>WESERVE</title>
    <!-- <meta fragment="" content="!" /> -->
    <base href="<?php echo base_url(); ?>">


    <!-- Bootstrap Core CSS -->
    <link href="<?php  echo base_url('assets/theme/vendor/bootstrap/css/bootstrap.min.css'); ?>" rel="stylesheet">
    <link rel="shortcut icon" href="<?php echo base_url('assets/images/favicon.png'); ?>" type="image/x-icon">
    <link rel="icon" href="<?php echo base_url('assets/images/Logo.png'); ?>" type="image/x-icon">
    <!-- Custom Fonts -->
    <link href="<?php echo base_url('assets/theme/vendor/font-awesome/css/font-awesome.min.css'); ?>" rel="stylesheet" type="text/css">
    <link href="<?php echo base_url('assets/css/app.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('assets/css/animate.css'); ?>" rel="stylesheet" />
    <link href="<?php echo base_url('assets/vendors/angular-toastr/dist/angular-toastr.min.css'); ?>" rel="stylesheet">
    <link href="<?php echo base_url('assets/css/bootstrap-datepicker.css'); ?>" rel="stylesheet" />
    <link href="<?php echo base_url('assets/vendors/fullcalendar/dist/fullcalendar.min.css'); ?>" rel="stylesheet" />
    <link href="<?php echo base_url('assets/vendors/bower_components/angular-ui-grid/ui-grid.min.css'); ?>" rel="stylesheet" />
    <link href="<?php echo base_url('assets/vendors/bower_components/angular/jk-rating-stars.min.css'); ?>" rel="stylesheet" />
</head>

<body ng-app="app" class="header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden">
    <div class="loading-screen" id="loading-screen">
        <div class="loading-gif">
            <img src="<?php echo base_url('assets/images/golf-boy.gif'); ?>" />
        </div>
        <div class="loading-text">
            <span style="--i:1">L</span>
            <span style="--i:2">o</span>
            <span style="--i:3">a</span>
            <span style="--i:4">d</span>
            <span style="--i:5">i</span>
            <span style="--i:6">n</span>
            <span style="--i:7">g</span>
            <span style="--i:8">.</span>
            <span style="--i:9">.</span>
            <span style="--i:10">.</span>
        </div>
    </div>
    <ui-view></ui-view>
    <!-- /#wrapper -->
    <input type="hidden" id="base_url" value="<?php echo base_url(); ?>">
    <input type="hidden" id="app_url" value="<?php echo base_url('ngapp/'); ?>">
    <input type="hidden" id="version" value="0.20180421">
    <script src="<?php echo base_url('assets/vendors/bower_components/jquery/dist/jquery.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/jquery-ui/jquery-ui.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular/angular.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/ng-idle/angular-idle.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/node_modules/angular-datatables/dist/angular-datatables.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/theme/vendor/bootstrap/js/bootstrap.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/js/datepicker.js'); ?>"></script>
    <script src="<?php echo base_url('assets/js/printThis/printThis.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/JSPrintManager/scripts/JSPrintManager.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/JSPrintManager/scripts/zip.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/JSPrintManager/scripts/zip-ext.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/JSPrintManager/scripts/deflate.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/mdb/js/mdb.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/ngMask/dist/ngMask.min.js'); ?>"></script>
    <!-- <script src="<?php echo base_url('assets/vendors/bower_components/globalize-master/src/core.js'); ?>"></script> -->
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-ui-router/release/angular-ui-router.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/oclazyload/dist/ocLazyLoad.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-animate/angular-animate.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-sanitize/angular-sanitize.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-ui/angular-ui.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-loading-bar/build/loading-bar.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-ui-grid/angular-aria.min.js'); ?>"></script>
    <!-- <script src="<?php //echo base_url('assets/vendors/bower_components/sweetalert/dist/sweetalert.min.js'); ?>"></script> -->
    <script src="<?php echo base_url('assets/vendors/angular-toastr/dist/angular-toastr.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/angular-toastr/dist/angular-toastr.tpls.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-ui-grid/ui-grid.core.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-ui-grid/ui-grid.cellnav.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-ui-grid/ui-grid.edit.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-ui-grid/ui-grid.row-edit.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-ui-grid/ui-grid.selection.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-ui-grid/ui-grid.resize-columns.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-ui-grid/ui-grid.auto-resize.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/angular-ui-grid/ui-grid.move-columns.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/bower_components/sheetjs-master/dist/xlsx.full.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/bower_components/chart.js/dist/Chart.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/bower_components/angular-chart.js/dist/angular-chart.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/bower_components/chart.js/dist/chart-plugin.js'); ?>"></script>
    <!-- <script src="static/vendors/moment/min/moment.min.js"></script> -->
    <script src="<?php echo base_url('assets/vendors/moment/min/moment.min.js'); ?>"></script>
    <script src="<?php echo base_url('assets/vendors/fullcalendar/dist/fullcalendar.min.js'); ?>"></script>
    <!-- <script src="static/vendors/fullcalendar/dist/fullcalendar.min.js"></script> -->
    <script src="<?php echo base_url('assets/vendors/bower_components/angular/jk-rating-stars.min.js'); ?>"></script>
    <!-- app -->
    <script src="<?php  echo base_url('ngapp/app.module.js'); ?>"></script>
    <script src="<?php  echo base_url('ngapp/app.routes.js'); ?>"></script>
    <script src="<?php  echo base_url('ngapp/app.controller.js'); ?>"></script>
    <script src="<?php  echo base_url('ngapp/common/http.service.js'); ?>"></script>
    <script src="<?php  echo base_url('ngapp/common/right_click.js'); ?>"></script>
    <script src="<?php  echo base_url('ngapp/common/directives.js'); ?>"></script>
    <script src="<?php  echo base_url('ngapp/app.service.js'); ?>"></script>
    <!-- <script src="<?php  //echo base_url('ngapp/filters.js'); ?>"></script> -->
    
</body>

</html>
