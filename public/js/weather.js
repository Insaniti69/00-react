'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var getIp = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
		var data, regex, ip, dataIp, countryName;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return axios.get('https://www.cloudflare.com/cdn-cgi/trace');

					case 2:
						data = _context.sent;
						regex = /ip=(.*?)$/gmi;
						ip = regex.exec(data.data);
						_context.next = 7;
						return axios.get('http://api.ipstack.com/' + ip[1] + '?access_key=479532addda6a49c78cd6860c0f9ffb4&format=1');

					case 7:
						dataIp = _context.sent;
						_context.next = 10;
						return getCountryInfo(dataIp.data.country_code);

					case 10:
						countryName = _context.sent;

						h1.textContent = 'Your ip ' + ip[1] + ' is located in ' + countryName.data.name;

					case 12:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function getIp() {
		return _ref.apply(this, arguments);
	};
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reactSection = document.querySelector('#react-section');
var h1 = document.querySelector('h1');

var CodeCountry = function (_React$Component) {
	_inherits(CodeCountry, _React$Component);

	function CodeCountry() {
		_classCallCheck(this, CodeCountry);

		return _possibleConstructorReturn(this, (CodeCountry.__proto__ || Object.getPrototypeOf(CodeCountry)).apply(this, arguments));
	}

	_createClass(CodeCountry, [{
		key: 'render',
		value: function render() {
			console.log(this.props.countryName);
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h2',
					null,
					'CODE ',
					this.props.code
				),
				this.props.countryName === 'Spain' && React.createElement(
					'p',
					null,
					this.props.countryName
				)
			);
		}
	}]);

	return CodeCountry;
}(React.Component);

function getCountryInfo(code) {
	return axios.get('https://restcountries.eu/rest/v2/alpha/' + code);
}

var getCountry = function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
		var code, res;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.prev = 0;
						code = e.value;
						_context2.next = 4;
						return getCountryInfo(e.value);

					case 4:
						res = _context2.sent;

						if (res.data.alpha2Code.toLowerCase() === code.toLowerCase()) {
							ReactDOM.render(React.createElement(CodeCountry, { code: code, countryName: res.data.name }), reactSection);
						}
						_context2.next = 11;
						break;

					case 8:
						_context2.prev = 8;
						_context2.t0 = _context2['catch'](0);

						ReactDOM.render(React.createElement(CodeCountry, { code: 'Not Found', countryName: 'Not Found' }), reactSection);

					case 11:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined, [[0, 8]]);
	}));

	return function getCountry(_x) {
		return _ref2.apply(this, arguments);
	};
}();

getIp();
