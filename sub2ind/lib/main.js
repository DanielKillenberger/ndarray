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
var getIndex = require( './../../base/sub2ind' );
var format = require( '@stdlib/string/format' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );


// MAIN //

/**
* Converts subscripts to a linear index.
*
* ## Notes
*
* -   The function accepts the following "modes":
*
*     -   `throw`: throws an error when a subscript exceeds array dimensions.
*     -   `wrap`: wrap around subscripts exceeding array dimensions using modulo arithmetic.
*     -   `clamp`: set subscripts exceeding array dimensions to either `0` (minimum index) or the maximum index along a particular dimension.
*
* -   If provided fewer modes than dimensions, the function recycles modes using modulo arithmetic.
*
* @param {NonNegativeIntegerArray} shape - array shape
* @param {...integer} i - subscripts
* @param {Options} [options] - function options
* @param {(StringArray|string)} [options.mode=["throw"]] - specifies how to handle subscripts which exceed array dimensions
* @param {string} [options.order="row-major"] - specifies whether an array is row-major (C-style) or column-major (Fortran-style)
* @throws {TypeError} first argument must be an array-like object containing nonnegative integers
* @throws {TypeError} subscripts must be integer valued
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {RangeError} must provide subscripts which do not exceed array dimensions
* @throws {RangeError} number of subscripts much match the number of dimensions
* @returns {NonNegativeInteger} linear index
*
* @example
* var i = sub2ind( [ 3, 3, 3 ], 1, 2, 2 );
* // returns 17
*/
function sub2ind() {
	var options;
	var shape;
	var ndims;
	var args;
	var opts;
	var err;
	var len;
	var i;
	var j;

	shape = arguments[ 0 ];
	if ( !isNonNegativeIntegerArray( shape ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be an array-like object containing nonnegative integers. Value: `%s`.', shape ) );
	}
	len = arguments.length;
	ndims = shape.length;

	opts = {};
	opts.mode = defaults.mode.slice();
	opts.order = defaults.order;

	if ( len > ndims+1 ) {
		j = len - 1;
		options = arguments[ j ];
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	} else {
		j = len;
	}
	i = 1;
	if ( j-i !== ndims ) {
		throw new RangeError( format( 'invalid argument. Number of provided subscripts must match the number of dimensions. ndims: `%u`. Number of subscripts: `%u`.', ndims, j-i ) );
	}
	args = new Array( ndims+4 );
	args[ 0 ] = shape;
	args[ 1 ] = shape2strides( shape, opts.order );
	args[ 2 ] = 0; // strides are positive, so offset is always zero
	for ( ; i < j; i++ ) {
		if ( !isInteger( arguments[ i ] ) ) {
			throw new TypeError( format( 'invalid argument. Subscripts must be integer valued. Argument: `%u`. Value: `%s`.', i, arguments[ i ] ) );
		}
		args[ i+2 ] = arguments[ i ];
	}
	args[ i+2 ] = opts.mode; // i+2 == args.length-1
	return getIndex.apply( null, args );
}


// EXPORTS //

module.exports = sub2ind;
