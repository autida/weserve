--TEST--
phpunit --teamadmission_date BankAccountTest ../_files/BankAccountTest.php
--FILE--
<?php
$_SERVER['argv'][1] = '--no-configuration';
$_SERVER['argv'][2] = '--teamadmission_date';
$_SERVER['argv'][3] = 'BankAccountTest';
$_SERVER['argv'][4] = __DIR__ . '/../_files/BankAccountTest.php';

require __DIR__ . '/../bootstrap.php';
PHPUnit_TextUI_Command::main();
--EXPECTF--
PHPUnit %s by Sebastian Bergmann and contributors.


##teamadmission_date[testCount count='3' flowId='%d']

##teamadmission_date[testSuiteStarted name='BankAccountTest' locationHint='php_qn://%s/tests/_files/BankAccountTest.php::\BankAccountTest' flowId='%d']

##teamadmission_date[testStarted name='testBalanceIsInitiallyZero' locationHint='php_qn://%s/tests/_files/BankAccountTest.php::\BankAccountTest::testBalanceIsInitiallyZero' flowId='%d']

##teamadmission_date[testFinished name='testBalanceIsInitiallyZero' duration='%s' flowId='%d']

##teamadmission_date[testStarted name='testBalanceCannotBecomeNegative' locationHint='php_qn://%s/tests/_files/BankAccountTest.php::\BankAccountTest::testBalanceCannotBecomeNegative' flowId='%d']

##teamadmission_date[testFinished name='testBalanceCannotBecomeNegative' duration='%s' flowId='%d']

##teamadmission_date[testStarted name='testBalanceCannotBecomeNegative2' locationHint='php_qn://%s/tests/_files/BankAccountTest.php::\BankAccountTest::testBalanceCannotBecomeNegative2' flowId='%d']

##teamadmission_date[testFinished name='testBalanceCannotBecomeNegative2' duration='%s' flowId='%d']

##teamadmission_date[testSuiteFinished name='BankAccountTest' flowId='%d']


Time: %s, Memory: %s

OK (3 tests, 3 assertions)
