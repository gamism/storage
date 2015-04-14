/**
 * Created by root on 4/1/15.
 */
/*!
 * accounting.js v0.4.1
 * Copyright 2014 Open Exchange Rates
 *
 * Freely distributable under the MIT license.
 * Portions of accounting.js are inspired or borrowed from underscore.js
 *
 * Full details and documentation:
 * http://openexchangerates.github.io/accounting.js/
 */

function getById(id)
{
	return document.getElementById(id)
}
function getByName(name)
{
	return document.getElementsByName(name)
}

function queryparser()
{
	var data = {}, s;
	s = window.location.search.split('?');
	if(s.length > 1)
	{
		$.each(s[1].split('&'), function(k, v){
			data[v.split('=')[0]] = v.split('=')[1];
		});
	}
	return data;
}

function feecount(table, cell)
{
	var rows = getById(table).rows, sum = 0;
	$.each(rows, function(k, v){
		//if($(v).children()[cell].children())
		{
			console.info('v ', $(v).children()[cell]);
		}
	})
}

function genRow(id)
{
	id = id || 'storage';
	var i,s = '';
	if(id == "storage2")
	{
		s += '<tr>' +
		'<td>' +
		'<div class="input-group"><span class="input-group-addon">品名</span><input type="text" class="form-control" name="item"/></div>' +
		'<div class="input-group"><span class="input-group-addon">規格</span><input type="text" class="form-control" name="spec"/></div>' +
		'</td>' +
		'<td style="width:70px;">' +
		'<input type="text" class="datepicker form-control text-center" name="date"/>' +
		'</td>' +
		'<td style="width:150px;">' +
		'<div class="input-group"><span class="input-group-addon">數量</span><input type="text" class="form-control" name="income_qty"/></div>' +
		'<div class="input-group"><span class="input-group-addon">重量</span><input type="text" class="form-control" name="income_weight"/></div>' +
		'</td>' +
		'<td style="width:150px;">' +
		'<div class="input-group"><span class="input-group-addon">數量</span><input type="text" class="form-control" name="outcome_qty"/></div>' +
		'<div class="input-group"><span class="input-group-addon">重量</span><input type="text" class="form-control" name="outcome_weight"/></div>' +
		'</td>' +
		'<td style="width:150px;">' +
		'<div class="input-group"><span class="input-group-addon">數量</span><input type="text" class="form-control" name="stack_qty"/></div>' +
		'<div class="input-group"><span class="input-group-addon">重量</span><input type="text" class="form-control" name="stack_weight"/></div>' +
		'</td>' +
		'<td style="width:100px;">' +
		'<div class="input-daterange input-group" id="datepicker">' +
		'<div class="input-group"><span class="input-group-addon">從</span><input type="text" class="form-control" name="start" /></div>' +
		'<div class="input-group"><span class="input-group-addon">至</span><input type="text" class="form-control" name="end" /></div>' +
		'</div>' +
		'</td>' +
		'<td>' +
		'<div class="input-group">' +
		'<span class="input-group-addon">天數</span><input name="days" type="text" class="form-control text-center" readonly/><span class="input-group-addon">單價</span><input name="unitprice" type="text" class="form-control text-center"/>' +
		'</div>' +
		'<div class="input-group">' +
		'<span class="input-group-addon">倉租</span><input name="storagefee" type="text" class="form-control text-center" readonly/><span class="input-group-addon">裝卸</span><input name="unload" type="text" class="form-control"/>' +
		'</div>' +
		'</td>' +
		'<td style="width:80px;" class="text-center">' +
		'<input class="btn btn-sm btn-primary" type="button" value="+" onclick="addDelRow(this, \'storage2\', \'add\');datepicker_init(this);"/> <input class="btn btn-sm btn-danger" type="button" value=" -" onclick="addDelRow(this, \'storage2\', \'del\');datepicker_init(this);"/>' +
		'</td>' +
		'</tr>';
	}
	if(id == 'deliverTable')
	{
		s += '<tr>';
		s += '<td><input name="name" type="text" class="form-control"/></td>';
		s += '<td><input name="spec" type="text" class="form-control"/></td>';
		s += '<td><input name="unit" type="text" class="form-control"/></td>';
		s += '<td><input name="qty" type="text" class="form-control"/></td>';
		s += '<td><input name="weight" type="text" class="form-control"/></td>';
		s += '<td nowrap class="text-right"><input class="btn btn-sm btn-primary" type="button" value="+" onclick="addDelRow(this, \''+id+'\', \'add\')"/> <input class="btn btn-sm btn-danger" type="button" value=" -" onclick="addDelRow(this, \''+id+'\', \'del\')"/></td>';
		s += '</tr>';
	}
	if(id == 'summary')
	{
		s += '<tr>';
		for (i = 0; i < 4; i++)
		{
			if(i==3)
			{
				s += '<td nowrap class="text-right"><input class="btn btn-sm btn-primary" type="button" value="+" onclick="addDelRow(this, \'summary\', \'add\')"/> <input class="btn btn-sm btn-danger" type="button" value=" -" onclick="addDelRow(this, \'summary\', \'del\')"/></td>';
			}
			else if(i == 1)
			{
				s += '<td><input class="form-control" type="text" onblur="feecount(\'summary\')"/></td>';
			}
			else
			{
				s += '<td><input class="form-control" type="text"/></td>';
			}
		}
		s += '</tr>';
	}
	if(id == 'stock')
	{
		s += '<tr class="item_content">';
		for (i = 0; i < 8; i++)
		{
			if($.inArray(i, [0,2,6]) > -1)
			{
				s += '<td><input class="form-control" type="text"/></td>';
			}
			else if($.inArray(i, [3,4,5]) > -1)
			{
				s += '<td><input class="form-control" type="text" onblur="feecount(\'stock\', '+i+')"/></td>';
			}
			else if (i == 7)
			{
				s += '<td nowrap class="text-right"><input class="btn btn-sm btn-primary" type="button" value="+" onclick="addDelRow(this, \'stock\', \'add\')"/> <input class="btn btn-sm btn-danger" type="button" value=" -" onclick="addDelRow(this, \'stock\', \'del\')"/></td>';
			}
			else
			{
				s += '<td><input type="text" size="10"/></td>'
			}
		}
		s += '</tr>';
	}
	if(id == 'storage')
	{
		s += '<tr class="item_content">';
		for (i = 1; i <= 16; i++)
		{
			if (i == 16)
			{
				s += '<td nowrap class="text-right"><input class="btn btn-sm btn-primary" type="button" value="+" onclick="addDelRow(this, \'storage\', \'add\')"/> <input class="btn btn-sm btn-danger" type="button" value=" -" onclick="addDelRow(this, \'storage\', \'del\')"/></td>';
			}
			else if ($.inArray(i, [1]) > -1)
			{
				s += '<td><input class="form-control" type="text" size="10"/></td>'
			}
			else if ($.inArray(i, [2]) > -1)
			{
				s += '<td><input type="text" size="10"/>' +
				'<select onchange="storagefee(this)">' +
				'<option value="0">數量</option>' +
				'<option value="1">才積</option>' +
				'</select>' +
				'</td>'
			}
			else if (i == 3)
			{
				s += '<td><input type="text" type="text" class="datepicker input-sm" size="3"></td>';
			}
			else if (i == 10)
			{
				s += '<td><div class="input-daterange input-group" id="datepicker">' +
				'<input type="text" class="input-sm" id="start" size="5"/>' +
				'<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>' +
				'<input type="text" class="input-sm" id="end" size="5"/>' +
				'</div></td>';
			}
			else if ($.inArray(i, [4, 5, 6, 7, 8]) > -1)
			{
				s += '<td><input type="text" size="5"/></td>'
			}
			else if ($.inArray(i, [9, 12, 15]) > -1)
			{
				s += '<td><input type="text" size="5" onblur="storagefee(this)"/></td>'
			}
			else
			{
				s += '<td></td>';
			}

		}
		s += '</tr>';
	}
	return s;
}

function addDelRow(row, id, method)
{
	var t, tr;
	if(method == 'top_add')
	{
		t = document.getElementById(id);
		tr = t.insertRow(t.rows.length - 1);
		tr.innerHTML = genRow(id);
	}
	if(method == 'add')
	{
		t = document.getElementById(id);
		tr = t.insertRow(row.parentNode.parentNode.rowIndex + 1);
		tr.innerHTML = genRow(id);
	}
	if(method == 'del')
	{
		document.getElementById(id).deleteRow(row.parentNode.parentNode.rowIndex);
		if(id == 'storage') quickcount()
	}
	if(id == 'storage')
	{
		$('.datepicker').datepicker(opt1.opt);
		$('.input-daterange').datepicker(opt2.opt).on('hide', function(e){
			daydiff(e)
		});
	}
}

(function(root, undefined) {

	/* --- Setup --- */

	// Create the local library object, to be exported or referenced globally later
	var lib = {};

	// Current version
	lib.version = '0.4.1';


	/* --- Exposed settings --- */

	// The library's settings configuration object. Contains default parameters for
	// currency and number formatting
	lib.settings = {
		currency: {
			symbol : "$",		// default currency symbol is '$'
			format : "%s%v",	// controls output: %s = symbol, %v = value (can be object, see docs)
			decimal : ".",		// decimal point separator
			thousand : ",",		// thousands separator
			precision : 2,		// decimal places
			grouping : 3		// digit grouping (not implemented yet)
		},
		number: {
			precision : 0,		// default precision on numbers is 0
			grouping : 3,		// digit grouping (not implemented yet)
			thousand : ",",
			decimal : "."
		}
	};


	/* --- Internal Helper Methods --- */

	// Store reference to possibly-available ECMAScript 5 methods for later
	var nativeMap = Array.prototype.map,
		nativeIsArray = Array.isArray,
		toString = Object.prototype.toString;

	/**
	 * Tests whether supplied parameter is a string
	 * from underscore.js
	 */
	function isString(obj) {
		return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
	}

	/**
	 * Tests whether supplied parameter is a string
	 * from underscore.js, delegates to ECMA5's native Array.isArray
	 */
	function isArray(obj) {
		return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
	}

	/**
	 * Tests whether supplied parameter is a true object
	 */
	function isObject(obj) {
		return obj && toString.call(obj) === '[object Object]';
	}

	/**
	 * Extends an object with a defaults object, similar to underscore's _.defaults
	 *
	 * Used for abstracting parameter handling from API methods
	 */
	function defaults(object, defs) {
		var key;
		object = object || {};
		defs = defs || {};
		// Iterate over object non-prototype properties:
		for (key in defs) {
			if (defs.hasOwnProperty(key)) {
				// Replace values with defaults only if undefined (allow empty/zero values):
				if (object[key] == null) object[key] = defs[key];
			}
		}
		return object;
	}

	/**
	 * Implementation of `Array.map()` for iteration loops
	 *
	 * Returns a new Array as a result of calling `iterator` on each array value.
	 * Defers to native Array.map if available
	 */
	function map(obj, iterator, context) {
		var results = [], i, j;

		if (!obj) return results;

		// Use native .map method if it exists:
		if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);

		// Fallback for native .map:
		for (i = 0, j = obj.length; i < j; i++ ) {
			results[i] = iterator.call(context, obj[i], i, obj);
		}
		return results;
	}

	/**
	 * Check and normalise the value of precision (must be positive integer)
	 */
	function checkPrecision(val, base) {
		val = Math.round(Math.abs(val));
		return isNaN(val)? base : val;
	}


	/**
	 * Parses a format string or object and returns format obj for use in rendering
	 *
	 * `format` is either a string with the default (positive) format, or object
	 * containing `pos` (required), `neg` and `zero` values (or a function returning
	 * either a string or object)
	 *
	 * Either string or format.pos must contain "%v" (value) to be valid
	 */
	function checkCurrencyFormat(format) {
		var defaults = lib.settings.currency.format;

		// Allow function as format parameter (should return string or object):
		if ( typeof format === "function" ) format = format();

		// Format can be a string, in which case `value` ("%v") must be present:
		if ( isString( format ) && format.match("%v") ) {

			// Create and return positive, negative and zero formats:
			return {
				pos : format,
				neg : format.replace("-", "").replace("%v", "-%v"),
				zero : format
			};

			// If no format, or object is missing valid positive value, use defaults:
		} else if ( !format || !format.pos || !format.pos.match("%v") ) {

			// If defaults is a string, casts it to an object for faster checking next time:
			return ( !isString( defaults ) ) ? defaults : lib.settings.currency.format = {
				pos : defaults,
				neg : defaults.replace("%v", "-%v"),
				zero : defaults
			};

		}
		// Otherwise, assume format was fine:
		return format;
	}


	/* --- API Methods --- */

	/**
	 * Takes a string/array of strings, removes all formatting/cruft and returns the raw float value
	 * Alias: `accounting.parse(string)`
	 *
	 * Decimal must be included in the regular expression to match floats (defaults to
	 * accounting.settings.number.decimal), so if the number uses a non-standard decimal
	 * separator, provide it as the second argument.
	 *
	 * Also matches bracketed negatives (eg. "$ (1.99)" => -1.99)
	 *
	 * Doesn't throw any errors (`NaN`s become 0) but this may change in future
	 */
	var unformat = lib.unformat = lib.parse = function(value, decimal) {
		// Recursively unformat arrays:
		if (isArray(value)) {
			return map(value, function(val) {
				return unformat(val, decimal);
			});
		}

		// Fails silently (need decent errors):
		value = value || 0;

		// Return the value as-is if it's already a number:
		if (typeof value === "number") return value;

		// Default decimal point comes from settings, but could be set to eg. "," in opts:
		decimal = decimal || lib.settings.number.decimal;

		// Build regex to strip out everything except digits, decimal point and minus sign:
		var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
			unformatted = parseFloat(
				("" + value)
					.replace(/\((.*)\)/, "-$1") // replace bracketed values with negatives
					.replace(regex, '')         // strip out any cruft
					.replace(decimal, '.')      // make sure decimal point is standard
			);

		// This will fail silently which may cause trouble, let's wait and see:
		return !isNaN(unformatted) ? unformatted : 0;
	};


	/**
	 * Implementation of toFixed() that treats floats more like decimals
	 *
	 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === "0.61") that present
	 * problems for accounting- and finance-related software.
	 */
	var toFixed = lib.toFixed = function(value, precision) {
		precision = checkPrecision(precision, lib.settings.number.precision);
		var power = Math.pow(10, precision);

		// Multiply up by precision, round accurately, then divide and use native toFixed():
		return (Math.round(lib.unformat(value) * power) / power).toFixed(precision);
	};


	/**
	 * Format a number, with comma-separated thousands and custom precision/decimal places
	 * Alias: `accounting.format()`
	 *
	 * Localise by overriding the precision and thousand / decimal separators
	 * 2nd parameter `precision` can be an object matching `settings.number`
	 */
	var formatNumber = lib.formatNumber = lib.format = function(number, precision, thousand, decimal) {
		// Resursively format arrays:
		if (isArray(number)) {
			return map(number, function(val) {
				return formatNumber(val, precision, thousand, decimal);
			});
		}

		// Clean up number:
		number = unformat(number);

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(precision) ? precision : {
					precision : precision,
					thousand : thousand,
					decimal : decimal
				}),
				lib.settings.number
			),

		// Clean up precision
			usePrecision = checkPrecision(opts.precision),

		// Do some calc:
			negative = number < 0 ? "-" : "",
			base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
			mod = base.length > 3 ? base.length % 3 : 0;

		// Format the number:
		return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
	};


	/**
	 * Format a number into currency
	 *
	 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
	 * defaults: (0, "$", 2, ",", ".", "%s%v")
	 *
	 * Localise by overriding the symbol, precision, thousand / decimal separators and format
	 * Second param can be an object matching `settings.currency` which is the easiest way.
	 *
	 * To do: tidy up the parameters
	 */
	var formatMoney = lib.formatMoney = function(number, symbol, precision, thousand, decimal, format) {
		// Resursively format arrays:
		if (isArray(number)) {
			return map(number, function(val){
				return formatMoney(val, symbol, precision, thousand, decimal, format);
			});
		}

		// Clean up number:
		number = unformat(number);

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(symbol) ? symbol : {
					symbol : symbol,
					precision : precision,
					thousand : thousand,
					decimal : decimal,
					format : format
				}),
				lib.settings.currency
			),

		// Check format (returns object with pos, neg and zero):
			formats = checkCurrencyFormat(opts.format),

		// Choose which format to use for this value:
			useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;

		// Return with currency symbol added:
		return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
	};


	/**
	 * Format a list of numbers into an accounting column, padding with whitespace
	 * to line up currency symbols, thousand separators and decimals places
	 *
	 * List should be an array of numbers
	 * Second parameter can be an object containing keys that match the params
	 *
	 * Returns array of accouting-formatted number strings of same length
	 *
	 * NB: `white-space:pre` CSS rule is required on the list container to prevent
	 * browsers from collapsing the whitespace in the output strings.
	 */
	lib.formatColumn = function(list, symbol, precision, thousand, decimal, format) {
		if (!list) return [];

		// Build options object from second param (if object) or all params, extending defaults:
		var opts = defaults(
				(isObject(symbol) ? symbol : {
					symbol : symbol,
					precision : precision,
					thousand : thousand,
					decimal : decimal,
					format : format
				}),
				lib.settings.currency
			),

		// Check format (returns object with pos, neg and zero), only need pos for now:
			formats = checkCurrencyFormat(opts.format),

		// Whether to pad at start of string or after currency symbol:
			padAfterSymbol = formats.pos.indexOf("%s") < formats.pos.indexOf("%v") ? true : false,

		// Store value for the length of the longest string in the column:
			maxLength = 0,

		// Format the list according to options, store the length of the longest string:
			formatted = map(list, function(val, i) {
				if (isArray(val)) {
					// Recursively format columns if list is a multi-dimensional array:
					return lib.formatColumn(val, opts);
				} else {
					// Clean up the value
					val = unformat(val);

					// Choose which format to use for this value (pos, neg or zero):
					var useFormat = val > 0 ? formats.pos : val < 0 ? formats.neg : formats.zero,

					// Format this value, push into formatted list and save the length:
						fVal = useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(val), checkPrecision(opts.precision), opts.thousand, opts.decimal));

					if (fVal.length > maxLength) maxLength = fVal.length;
					return fVal;
				}
			});

		// Pad each number in the list and send back the column of numbers:
		return map(formatted, function(val, i) {
			// Only if this is a string (not a nested array, which would have already been padded):
			if (isString(val) && val.length < maxLength) {
				// Depending on symbol position, pad after symbol or at index 0:
				return padAfterSymbol ? val.replace(opts.symbol, opts.symbol+(new Array(maxLength - val.length + 1).join(" "))) : (new Array(maxLength - val.length + 1).join(" ")) + val;
			}
			return val;
		});
	};


	/* --- Module Definition --- */

	// Export accounting for CommonJS. If being loaded as an AMD module, define it as such.
	// Otherwise, just add `accounting` to the global object
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = lib;
		}
		exports.accounting = lib;
	} else if (typeof define === 'function' && define.amd) {
		// Return the library as an AMD module:
		define([], function() {
			return lib;
		});
	} else {
		// Use accounting.noConflict to restore `accounting` back to its original value.
		// Returns a reference to the library's `accounting` object;
		// e.g. `var numbers = accounting.noConflict();`
		lib.noConflict = (function(oldAccounting) {
			return function() {
				// Reset the value of the root's `accounting` variable:
				root.accounting = oldAccounting;
				// Delete the noConflict method:
				lib.noConflict = undefined;
				// Return reference to the library to re-assign it:
				return lib;
			};
		})(root.accounting);

		// Declare `fx` on the root (global/window) object:
		root['accounting'] = lib;
	}

	// Root will be `window` in browser or `global` on the server:
}(this));

