/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).primitives;
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
var shape2strides = require( './../../base/shape2strides' );
var getSubscripts = require( './../../base/ind2sub' ).assign;
var format = require( '@stdlib/string/format' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );


// MAIN //

/**
* Converts a linear index to an array of subscripts and assigns results to a provided output array.
*
* ## Notes
*
* -   The function accepts the following "modes":
*
*     -   `throw`: throws an error when a linear index exceeds array dimensions.
*     -   `wrap`: wrap around a linear index exceeding array dimensions using modulo arithmetic.
*     -   `clamp`: set a linear index exceeding array dimensions to either `0` (minimum linear index) or the maximum linear index.
*
* @param {NonNegativeIntegerArray} shape - array shape
* @param {integer} idx - linear index
* @param {Options} [options] - function options
* @param {string} [options.mode="throw"] - specifies how to handle a linear index which exceeds array dimensions
* @param {string} [options.order="row-major"] - specifies whether an array is row-major (C-style) or column-major (Fortran-style)
* @param {(Array|TypedArray|Object)} out - output array
* @throws {TypeError} output argument must be either an array, typed array, or an object
* @throws {TypeError} shape argument must be an array-like object containing nonnegative integers
* @throws {TypeError} linear index argument must be integer valued
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {RangeError} must provide a linear index which does not exceed array dimensions
* @returns {NonNegativeIntegerArray} subscripts
*
* @example
* var shape = [ 3, 3, 3 ];
* var out = [ 0, 0, 0 ];
*
* var s = ind2sub( shape, 17, out );
* // returns [ 1, 2, 2 ]
*
* var bool = ( s === out );
* // returns true
*/
function ind2sub( shape, idx, options, out ) {
	var opts;
	var dest;
	var err;

	opts = {};
	opts.mode = defaults.mode;
	opts.order = defaults.order;
	if ( arguments.length === 4 ) {
		err = validate( opts, arguments[ 2 ] );
		if ( err ) {
			throw err;
		}
		if ( typeof out !== 'object' || out === null ) {
			throw new TypeError( format( 'invalid argument. Output argument must be either an array, typed array, or object. Value: `%s`.', out ) );
		}
		dest = out;
	} else {
		dest = options;
		if ( typeof dest !== 'object' || dest === null ) {
			throw new TypeError( format( 'invalid argument. Output argument must be either an array, typed array, or object. Value: `%s`.', dest ) );
		}
	}
	if ( !isNonNegativeIntegerArray( shape ) ) {
		throw new TypeError( format( 'invalid argument. Shape argument must be an array-like object containing nonnegative integers. Value: `%s`.', shape ) );
	}
	if ( !isInteger( idx ) ) {
		throw new TypeError( format( 'invalid argument. Linear index must be integer valued. Value: `%s`.', idx ) );
	}
	// Note: strides are positive, so offset is always zero
	return getSubscripts( shape, shape2strides( shape, opts.order ), 0, opts.order, idx, opts.mode, dest ); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = ind2sub;
