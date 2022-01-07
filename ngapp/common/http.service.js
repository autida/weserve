(function () {
	'use strict';
	angular
		.module('sharedMod', ['oc.lazyLoad'])
		.factory('httpService', httpService)
		.factory('baseService', baseService);

	httpService.$inject = ['$http', '$q', '$httpParamSerializerJQLike', '$ocLazyLoad', '$uibModal'];
	baseService.$inject = ['httpService', '$q', '$ocLazyLoad', '$uibModal', '$filter', 'toastr'];

	function httpService($http, $q, $httpParamSerializerJQLike, $ocLazyLoad, $uibModal) {
		var baseURL = '';
		var service = {
			getData: getData,
			postData: postData,
			putData: putData,
			deleteData: deleteData,
			uploadData: uploadData,
		};
		return service;

		function getData(data, urldata) {
			var url = this.baseURL;
			if (urldata) {
				url = urldata;
			}
			if (data && data != {}) {
				var params = '?';
				angular.forEach(data, function (v, k) {
					params += k + '=' + v + '&';
				});
				url += params;
			}
			return $http({
				method: 'GET',
				url: url,
			}).then(
				function (results) {
					return results;
				},
				function (error) {
					if (error.status == 403) {
						swal('You are not logged in. Please login again.', '', 'error');
						window.location.href = BASE_URL + 'auth/login';
					}
					return error;
				}
			);
		}
		function postData(data) {
			return $http({
				method: 'POST',
				url: this.baseURL,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				data: $.param(data), //$httpParamSerializerJQLike(data)
			}).then(
				function (response) {
					return response;
				},
				function (error) {
					swal(error.data.message, '', 'warning');
					return false;
				}
			);
		}
		function putData(data) {
			return $http({
				method: 'PUT',
				url: this.baseURL,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				data: $.param(data),
			}).then(
				function (response) {
					return response;
				},
				function (error) {
					swal(error.data.message, '', 'warning');
					return false;
				}
			);
		}
		function deleteData() {
			var baseURL = this.baseURL;
			var deferred = $q.defer();
			var templateUrl = COMURL + 'confirmation/view.html?v=' + VERSION;
			var filesToLoad = [
				COMURL + 'confirmation/view.html?v=' + VERSION,
				COMURL + 'confirmation/controller.js?v=' + VERSION,
			]
			var controllerName = 'ConfirmationCtrl';
			var dataFromMainCtrl = {
				title: 'Confirm Deletion?',
				message: 'Are you sure you want to delete this record?',
				buttonTruthyName: 'Delete',
				buttonFalsyName: 'Cancel',
				danger: true
			};
			$ocLazyLoad.load(filesToLoad).then(function () {
				var modalInstance = $uibModal.open({
					animation: false,
					templateUrl: templateUrl,
					controller: controllerName,
					controllerAs: 'modal',
					windowClass: 'confirmation-window',
					backdrop: 'static',
					resolve: {
						data: function () {
							return dataFromMainCtrl;
						},
					},
				});
				modalInstance.result.then(
					function (data) {
						if (data) {
							LOADING.classList.add("open");
							return $http({
								method: 'DELETE',
								url: baseURL,
								headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
							}).then(
								function (results) {
									deferred.resolve(results);
								},
								function (error) {
									deferred.resolve(false);
								}
							);
						}
					},
					function () {
						console.log('Modal closed');
					}
				);
			});
			return deferred.promise;
		}
		function uploadData(data) {
			return $http({
				method: 'POST',
				url: this.baseURL,
				withCredentials: true,
				headers: { 'Content-Type': undefined },
				transformRequest: angular.identity,
				data: data,
			}).then(
				function (results) {
					return results;
				},
				function (error) {
					swal(error.data.message, '', 'warning');
					return false;
				}
			);
		}
	}

	function baseService(httpService, $q, $ocLazyLoad, $uibModal, $filter, toastr) {
		var baseService = function () {
			var service = {
				modal: modal,
				get: get,
				save: save,
				delete: remove,
				showSwal: showSweetAlert,
				http: angular.copy(httpService),
				records: [],
				upload: upload,
				has_get: false,
				getDate: getDate,
				getAmount: getAmount,
				getTime: getTime,
				parseTime: parseTime,
				confirmation: confirmation,
				pad: pad,
				convertNumberToWords: convertNumberToWords,
				printElement: printElement,
			};

			return service;

			function modal(options) {
				var templateUrl = options.templateUrl;
				var filesToLoad = options.filesToLoad;
				var controllerName = options.controllerName;
				var viewSize = 'lg';
				if (options.viewSize && options.viewSize.length > 0) {
					viewSize = options.viewSize;
				}
				var dataFromMainCtrl = options.data;
				var animation = options.animation ? true : false;
				var windowClass = options.windowClass;
				return $ocLazyLoad.load(filesToLoad).then(function () {
					var modalInstance = $uibModal.open({
						animation: animation,
						templateUrl: templateUrl,
						controller: controllerName,
						controllerAs: 'modal',
						size: viewSize,
						backdrop: true,
						windowClass: windowClass,
						resolve: {
							data: function () {
								return dataFromMainCtrl;
							},
						},
					});
					return modalInstance.result.then(
						function (data) {
							return data;
						},
						function () {
							console.log('Modal Closed');
						}
					);
				});
			}
			function confirmation(title, message, trueButton, falseButton, danger) {
				var data = { title: title, message: message, buttonTruthyName: trueButton, buttonFalsyName: falseButton, danger: danger };
				var templateUrl = COMURL + 'confirmation/view.html?v=' + VERSION;
				var filesToLoad = [
					COMURL + 'confirmation/view.html?v=' + VERSION,
					COMURL + 'confirmation/controller.js?v=' + VERSION,
				]
				var controllerName = 'ConfirmationCtrl';
				return $ocLazyLoad.load(filesToLoad).then(function () {
					var modalInstance = $uibModal.open({
						animation: false,
						templateUrl: templateUrl,
						controller: controllerName,
						controllerAs: 'modal',
						windowClass: 'confirmation-window',
						backdrop: 'static',
						resolve: {
							data: function () {
								return data;
							},
						},
					});
					return modalInstance.result.then(
						function (data) {
							return data;
						},
						function () {
							console.log('Modal Closed');
						}
					);
				});
			}
			function showSweetAlert(title, message, icon) {
				if (icon === 'success') {
					toastr.success(message, title);
				} else if (icon === 'warning') {
					toastr.warning(message, title);
				} else {
					toastr.error(message, title);
				}
			}
			function getAmount(amount) {
				if (amount) {
					var dt = amount.replace(/,/g, '');
					return dt;
				}
			}
			function getDate(inputDate) {
				var dt = new Date(inputDate);
				var dtString = dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate());
				return dtString;
			}
			function getTime(inputTime) {
				var dt = new Date(inputTime);
				var dtString = dt.getHours() + ':' + dt.getMinutes();
				return dtString;
			}
			function parseTime(inputTime) {
				var dates = new Date().getDate();
				var year = new Date().getFullYear();
				var month = new Date().getMonth();
				var splitTime = inputTime.split(':');
				var hours = splitTime[0];
				var minutes = splitTime[1];
				var timeString = new Date(year, month, dates, hours, minutes);
				return timeString;
			}
			function pad(number, length) {
				var str = '' + number;
				while (str.length < length) {
					str = '0' + str;
				}
				return str;
			}
			function get(data) {
				httpService.baseURL = this.url;
				return httpService.getData(data).then(function (response) {
					return response.data;
				});
			}
			function save(data) {
				httpService.baseURL = this.url;
				return httpService.postData(data).then(function (response) {
					return response.data;
				});
			}
			function upload(data) {
				httpService.baseURL = this.url;
				return httpService.uploadData(data).then(function (response) {
					return response.data;
				})
			}
			function remove(id) {
				httpService.baseURL = this.url + '?id=' + id;
				return httpService.deleteData().then(function (response) {
					return response.data;
				});
			}
			function convertNumberToWords(n, custom_join_character) {
				var string = n.toString(),
					units,
					tens,
					scales,
					start,
					end,
					chunks,
					chunksLen,
					chunk,
					ints,
					i,
					word,
					words;

				var and = custom_join_character || 'and';
				if (parseInt(string) === 0) {
					return 'zero';
				}
				units = [
					'',
					'One',
					'Two',
					'Three',
					'Four',
					'Five',
					'Six',
					'Seven',
					'Eight',
					'Nine',
					'Ten',
					'Eleven',
					'Twelve',
					'Thirteen',
					'Fourteen',
					'Fifteen',
					'Sixteen',
					'Seventeen',
					'Eighteen',
					'Nineteen',
				];

				/* Array of tens as words */
				tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

				/* Array of scales as words */
				scales = [
					'',
					'Thousand',
					'Million',
					'Billion',
					'Trillion',
					'Quadrillion',
					'Quintillion',
					'Sextillion',
					'Septillion',
					'Octillion',
					'Nonillion',
					'Decillion',
					'Undecillion',
					'Duodecillion',
					'Tredecillion',
					'Quatttuor-decillion',
					'Quindecillion',
					'Sexdecillion',
					'Septen-decillion',
					'Octodecillion',
					'Novemdecillion',
					'Vigintillion',
					'Centillion',
				];

				/* Split user arguemnt into 3 digit chunks from right to left */
				start = string.length;
				chunks = [];
				while (start > 0) {
					end = start;
					chunks.push(string.slice((start = Math.max(0, start - 3)), end));
				}

				/* Check if function has enough scale words to be able to stringify the user argument */
				chunksLen = chunks.length;
				if (chunksLen > scales.length) {
					return '';
				}

				/* Stringify each integer in each chunk */
				words = [];
				for (i = 0; i < chunksLen; i++) {
					chunk = parseInt(chunks[i]);

					if (chunk) {
						/* Split chunk into array of individual integers */
						ints = chunks[i]
							.split('')
							.reverse()
							.map(parseFloat);

						/* If tens integer is 1, i.e. 10, then add 10 to units integer */
						if (ints[1] === 1) {
							ints[0] += 10;
						}

						/* Add scale word if chunk is not zero and array item exists */
						if ((word = scales[i])) {
							words.push(word);
						}

						/* Add unit word if array item exists */
						if ((word = units[ints[0]])) {
							words.push(word);
						}

						/* Add tens word if array item exists */
						if ((word = tens[ints[1]])) {
							words.push(word);
						}

						/* Add 'and' string after units or tens integer if: */
						if (ints[0] || ints[1]) {
							/* Chunk has a hundreds integer or chunk is the first of multiple chunks */
							if (ints[2] || (!i && chunksLen)) {
								words.push(and);
							}
						}

						/* Add hundreds word if array item exists */
						if ((word = units[ints[2]])) {
							words.push(word + ' Hundred');
						}
					}
				}
				return words.reverse().join(' ');
			};
			function printElement(elem, append, delimiter) {
				var domClone = elem.cloneNode(true);
				var $printSection = document.getElementById("printSection");

				if (!$printSection) {
					var $printSection = document.createElement("div");
					$printSection.id = "printSection";
					document.body.appendChild($printSection);
				}

				if (append !== true) {
					$printSection.innerHTML = "";
				}

				else if (append === true) {
					if (typeof (delimiter) === "string") {
						$printSection.innerHTML += delimiter;
					}
					else if (typeof (delimiter) === "object") {
						$printSection.appendChlid(delimiter);
					}
				}
				$printSection.appendChild(domClone);
			}
		};
		return baseService;
	}
})();
