--TEST--
phpunit --teamadmission_date ExceptionStackTest ../_files/ExceptionStackTest.php
--FILE--
<?php
$_SERVER['argv'][1] = '--no-configuration';
$_SERVER['argv'][2] = '--teamadmission_date';
$_SERVER['argv'][3] = 'ExceptionStackTest';
$_SERVER['argv'][4] = __DIR__ . '/../_files/ExceptionStackTest.php';

require __DIR__ . '/../bootstrap.php';
PHPUnit_TextUI_Command::main();
--EXPECTF--
PHPUnit %s by Sebastian Bergmann and contributors.


##teamadmission_date[testCount count='2' flowId='%d']

##teamadmission_date[testSuiteStarted name='ExceptionStackTest' locationHint='php_qn://%s/tests/_files/ExceptionStackTest.php::\ExceptionStackTest' flowId='%d']

##teamadmission_date[testStarted name='testPrintingChildException' locationHint='php_qn://%s/tests/_files/ExceptionStackTest.php::\ExceptionStackTest::testPrintingChildException' flowId='%d']

##teamadmission_date[testFailed name='testPrintingChildException' message='Child exception|nmessage|nFailed asserting that two arrays are equal.|n--- Expected|n+++ Actual|n@@ @@|n Array (|n-    0 => 1|n+    0 => 2|n )|n' details=' %s/tests/_files/ExceptionStackTest.php:10|n |n Caused by|n message|n Failed asserting that two arrays are equal.|n --- Expected|n +++ Actual|n @@ @@|n  Array (|n -    0 => 1|n +    0 => 2|n  )|n |n %s/tests/_files/ExceptionStackTest.php:7|n ' flowId='%d']

##teamadmission_date[testFinished name='testPrintingChildException' duration='%d' flowId='%d']

##teamadmission_date[testStarted name='testNestedExceptions' locationHint='php_qn://%s/tests/_files/ExceptionStackTest.php::\ExceptionStackTest::testNestedExceptions' flowId='%d']

##teamadmission_date[testFailed name='testNestedExceptions' message='Exception : One' details=' %s/tests/_files/ExceptionStackTest.php:18|n ' flowId='%d']

##teamadmission_date[testFinished name='testNestedExceptions' duration='%d' flowId='%d']

##teamadmission_date[testSuiteFinished name='ExceptionStackTest' flowId='%d']


Time: %s, Memory: %s


ERRORS!
Tests: 2, Assertions: 1, Errors: 2.