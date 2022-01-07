angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$ocLazyLoadProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $ocLazyLoadProvider.config({
            debug: false,
        });
        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: COMURL + 'full.html?v=' + VERSION,
            })
            .state('app.main', {
                url: '/',
                templateUrl: APPURL + 'dashboard/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [APPURL + 'dashboard/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Dashboard',
                },
            })
            // .state('app.calendar', {
            //     url: '/',
            //     templateUrl: APPURL + 'calendar/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [APPURL + 'calendar/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Calendar',
            //     },
            // })
            .state('app.menu', {
                url: '/add-menu',
                templateUrl: APPURL + 'dashboard/calendar.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [APPURL + 'dashboard/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Calendar',
                },
            })
            .state('app.profile', {
                url: '/view-profile',
                templateUrl: COMURL + 'profile/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [COMURL + 'profile/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'View Profile',
                },
            })
            .state('app.salon-profile', {
                url: '/salon-profile',
                templateUrl: COMURL + 'salon_profile/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [COMURL + 'salon_profile/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Salon Profile',
                },
            })
            // MASTERFILE
            .state('app.masterfile', {
                abstract: true,
            })
            .state('app.masterfile.salon', {
                url: '/salon',
                templateUrl: MASTERURL + 'salon/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [MASTERURL + 'salon/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Masterfile > Salon',
                    urlGroup: 'Masterfile',
                    formName: 'Salon',
                },
            })

            .state('app.masterfile.staff', {
                url: '/staff',
                templateUrl: MASTERURL + 'staff/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [MASTERURL + 'staff/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Masterfile > Staff',
                    urlGroup: 'Masterfile',
                    formName: 'Staff',
                },
            })

            .state('app.masterfile.photos', {
                url: '/photos',
                templateUrl: MASTERURL + 'photos/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [MASTERURL + 'photos/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Masterfile > Photos',
                    urlGroup: 'Masterfile',
                    formName: 'Photos',
                },
            })

            .state('app.masterfile.service', {
                url: '/service',
                templateUrl: MASTERURL + 'service/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [MASTERURL + 'service/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Masterfile > Service',
                    urlGroup: 'Masterfile',
                    formName: 'Service',
                },
            })
       
            //ADMINISTRATIVE
            .state('app.administrative', {
                abstract: true,
            })
            .state('app.administrative.user-list', {
                url: '/user-list',
                templateUrl: ADMINURL + 'user_list/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [ADMINURL + 'user_list/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Administrative > User List',
                    urlGroup: 'Administrative',
                    formName: 'User List',
                },
            })
           
        //TRANSACTION
        .state('app.transaction', {
                abstract: true,
            })
            .state('app.transaction.approval', {
                url: '/approval',
                templateUrl: TRANSURL + 'approval/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'approval/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > Approval',
                    urlGroup: 'Transaction',
                    formName: 'Approval',
                },
            })
            .state('app.transaction.appointment', {
                url: '/appointment',
                templateUrl: TRANSURL + 'appointment/view.html?v=' + VERSION,
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                files: [TRANSURL + 'appointment/controller.js?v=' + VERSION],
                            });
                        },
                    ],
                },
                params: {
                    urlName: 'Transaction > Appointment',
                    urlGroup: 'Transaction',
                    formName: 'Appointment',
                },
            })
            // .state('app.transaction.check-issuance', {
            //     url: '/check-issuance',
            //     templateUrl: TRANSURL + 'check_voucher/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [TRANSURL + 'check_voucher/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Transaction > Check Issuance',
            //         urlGroup: 'Transaction',
            //         formName: 'Check Issuance',
            //     },
            // })
            // .state('app.transaction.general-journal-entry', {
            //     url: '/general-journal-entry',
            //     templateUrl: TRANSURL + 'journal_voucher/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [TRANSURL + 'journal_voucher/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Transaction > General Journal Entry',
            //         urlGroup: 'Transaction',
            //         formName: 'General Journal Entry',
            //     },
            // })
            // .state('app.transaction.monthly-receivable', {
            //     url: '/monthly-receivable',
            //     templateUrl: TRANSURL + 'monthly_receivable/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [TRANSURL + 'monthly_receivable/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Transaction > Run Monthly Receivable',
            //         urlGroup: 'Transaction',
            //         formName: 'Run Monthly Receivable',
            //     },
            // })
            // .state('app.transaction.annual-receivable', {
            //     url: '/annual-receivable',
            //     templateUrl: TRANSURL + 'annual_receivable/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [TRANSURL + 'annual_receivable/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Transaction > Run Annual Receivable',
            //         urlGroup: 'Transaction',
            //         formName: 'Run Annual Receivable',
            //     },
            // })
            // .state('app.transaction.cashier-daily-denomination', {
            //     url: '/cashier-daily-denomination',
            //     templateUrl: TRANSURL + 'cashier_daily_denomination/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [TRANSURL + 'cashier_daily_denomination/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Transaction > Cashier Daily Denomination',
            //         urlGroup: 'Transaction',
            //         formName: 'Cashier Daily Denomination',
            //     },
            // })
            // // .state('app.transaction.monthly-dues-ledger', {
            // // 	url: '/monthly-dues-ledger',
            // // 	templateUrl: TRANSURL + 'monthly_dues_ledger/view.html?v=' + VERSION,
            // // 	resolve: {
            // // 		loadMyCtrl: [
            // // 			'$ocLazyLoad',
            // // 			function ($ocLazyLoad) {
            // // 				return $ocLazyLoad.load({
            // // 					files: [TRANSURL + 'monthly_dues_ledger/controller.js?v=' + VERSION],
            // // 				});
            // // 			},
            // // 		],
            // // 	},
            // // 	params: {
            // // 		urlName: 'Transaction > Monthly Dues Ledger',
            // // 		urlGroup: 'Transaction',
            // // 		formName: 'Monthly Dues Ledger',
            // // 	},
            // // })
            // // .state('app.transaction.construction-bond', {
            // // 	url: '/construction-bond',
            // // 	templateUrl: TRANSURL + 'construction_bond/view.html?v=' + VERSION,
            // // 	resolve: {
            // // 		loadMyCtrl: [
            // // 			'$ocLazyLoad',
            // // 			function ($ocLazyLoad) {
            // // 				return $ocLazyLoad.load({
            // // 					files: [TRANSURL + 'construction_bond/controller.js?v=' + VERSION],
            // // 				});
            // // 			},
            // // 		],
            // // 	},
            // // 	params: {
            // // 		urlName: 'Transaction > Construction Bond',
            // // 		urlGroup: 'Transaction',
            // // 		formName: 'Construction Bond',
            // // 	},
            // // })
            // .state('app.transaction.ledger', {
            //     url: '/ledger',
            //     templateUrl: TRANSURL + 'ledger/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [TRANSURL + 'ledger/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Transaction > Ledger',
            //         urlGroup: 'Transaction',
            //         formName: 'Ledger',
            //     },
            // })
            // .state('app.transaction.aging', {
            //     url: '/aging',
            //     templateUrl: TRANSURL + 'aging/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [TRANSURL + 'aging/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Transaction > Aging',
            //         urlGroup: 'Transaction',
            //         formName: 'Aging',
            //     },
            // })
            // // .state('app.transaction.journal', {
            // // 	url: '/journal-voucher',
            // // 	templateUrl: TRANSURL + 'journal_voucher/view.html?v=' + VERSION,
            // // 	resolve: {
            // // 		loadMyCtrl: [
            // // 			'$ocLazyLoad',
            // // 			function ($ocLazyLoad) {
            // // 				return $ocLazyLoad.load({
            // // 					files: [TRANSURL + 'journal_voucher/controller.js?v=' + VERSION],
            // // 				});
            // // 			},
            // // 		],
            // // 	},
            // // 	params: {
            // // 		urlName: 'Transaction > Journal Voucher',
            // // 		urlGroup: 'Transaction',
            // // 		formName: 'Journal Voucher',
            // // 	},
            // // })
            // // .state('app.transaction.check-voucher', {
            // // 	url: '/check-voucher',
            // // 	templateUrl: TRANSURL + 'check_voucher/view.html?v=' + VERSION,
            // // 	resolve: {
            // // 		loadMyCtrl: [
            // // 			'$ocLazyLoad',
            // // 			function ($ocLazyLoad) {
            // // 				return $ocLazyLoad.load({
            // // 					files: [TRANSURL + 'check_voucher/controller.js?v=' + VERSION],
            // // 				});
            // // 			},
            // // 		],
            // // 	},
            // // 	params: {
            // // 		urlName: 'Transaction > Check Voucher',
            // // 		urlGroup: 'Transaction',
            // // 		formName: 'Check Voucher',
            // // 	},
            // // })
            // //REPORTS
            // .state('app.reports', {
            //     abstract: true,
            // })
            // .state('app.reports.aging-of-receivable', {
            //     url: '/aging-of-receivable',
            //     templateUrl: REPURL + 'aging_of_receivable/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'aging_of_receivable/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > Aging of Receivable',
            //         urlGroup: 'Reports',
            //         formName: 'Aging of Receivable',
            //     },
            // })
            // .state('app.reports.general-ledger-report', {
            //     url: '/general-ledger-report',
            //     templateUrl: REPURL + 'general_ledger_report/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'general_ledger_report/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > General Ledger Report',
            //         urlGroup: 'Reports',
            //         formName: 'General Ledger Report',
            //     },
            // })
            // .state('app.reports.collection-vs-receivable', {
            //     url: '/collection-vs-receivable',
            //     templateUrl: REPURL + 'collection_vs_receivable/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'collection_vs_receivable/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > Collection vs Receivable',
            //         urlGroup: 'Reports',
            //         formName: 'Collection vs Receivable',
            //     },
            // })
            // .state('app.reports.construction-bond-report', {
            //     url: '/construction-bond-report',
            //     templateUrl: REPURL + 'construction_bond_report/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'construction_bond_report/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > Construction Bond Report',
            //         urlGroup: 'Reports',
            //         formName: 'Construction Bond Report',
            //     },
            // })
            // .state('app.reports.cashier-daily-cash-position', {
            //     url: '/cashier-daily-cash-position',
            //     templateUrl: REPURL + 'cashier_daily_cash_disposition/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'cashier_daily_cash_disposition/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > Cashier Daily Cash Position',
            //         urlGroup: 'Reports',
            //         formName: 'Cashier Daily Cash Position',
            //     },
            // })
            // .state('app.reports.cashier-summary', {
            //     url: '/cashier-summary',
            //     templateUrl: REPURL + 'cashier_summary/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'cashier_summary/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > Cashier Summary',
            //         urlGroup: 'Reports',
            //         formName: 'Cashier Summary',
            //     },
            // })
            // .state('app.reports.trial-balance', {
            //     url: '/trial-balance',
            //     templateUrl: REPURL + 'trial_balance/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'trial_balance/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > Financial Report',
            //         urlGroup: 'Reports',
            //         formName: 'Trial Balance',
            //     },
            // })
            // .state('app.reports.income-statement', {
            //     url: '/income-statement',
            //     templateUrl: REPURL + 'income_statement/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'income_statement/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > Income Statement',
            //         urlGroup: 'Reports',
            //         formName: 'Income Statement',
            //     },
            // })
            // .state('app.reports.balance-sheet', {
            //     url: '/balance-sheet',
            //     templateUrl: REPURL + 'balance_sheet/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'balance_sheet/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > Balance Sheet',
            //         urlGroup: 'Reports',
            //         formName: 'Balance Sheet',
            //     },
            // })
            // .state('app.reports.journal-book', {
            //     url: '/journal-book',
            //     templateUrl: REPURL + 'journal_book/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'journal_book/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > Journal Book',
            //         urlGroup: 'Reports',
            //         formName: 'Journal Book',
            //     },
            // })
            
            // .state('app.reports.comparative-is', {
            //     url: '/comparative-is',
            //     templateUrl: REPURL + 'comparative_is/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'comparative_is/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > Comparative Income Statement',
            //         urlGroup: 'Reports',
            //         formName: 'Comparative Income Statement',
            //     },
            // })
            // .state('app.reports.masterfile-reports', {
            //     url: '/masterfile-reports',
            //     templateUrl: REPURL + 'masterfile_reports/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'masterfile_reports/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > Generate Masterfile Report',
            //         urlGroup: 'Reports',
            //         formName: 'Generate Masterfile Report',
            //     },
            // })
            // .state('app.reports.collection-summary-report', {
            //     url: '/collection-summary-report',
            //     templateUrl: REPURL + 'collection_summary_reports/view.html?v=' + VERSION,
            //     resolve: {
            //         loadMyCtrl: [
            //             '$ocLazyLoad',
            //             function($ocLazyLoad) {
            //                 return $ocLazyLoad.load({
            //                     files: [REPURL + 'collection_summary_reports/controller.js?v=' + VERSION],
            //                 });
            //             },
            //         ],
            //     },
            //     params: {
            //         urlName: 'Reports > Generate Collection Summary Report',
            //         urlGroup: 'Reports',
            //         formName: 'Generate Collection Summary Report',
            //     },
            // })
        $locationProvider.hashPrefix('');
    },
]);