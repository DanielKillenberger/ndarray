/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
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

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var args2multislice = require( '@stdlib/slice/base/args2multislice' );
var Slice = require( '@stdlib/slice/ctor' );
var slice = require( './../../../base/slice' );


// MAIN //

/**
* Returns a shifted view of an input ndarray.
*
* @param {ndarray} x - input array
* @param {Array<null|void|integer>} start - starting indices (inclusive)
* @param {boolean} strict - boolean indicating whether to enforce strict bounds checking
* @param {boolean} writable - boolean indicating whether a returned array should be writable
* @throws {RangeError} number of slice dimensions must match the number of array dimensions
* @throws {RangeError} slice exceeds array bounds
* @returns {ndarray} ndarray view
*
* @example
* var ndarray = require( '@stdlib/ndarray/ctor' );
* var ndarray2array = require( '@stdlib/ndarray/to-array' );
*
* var buffer = [ 1.0, 2.0, 3.0, 4.0, 5.0, 6.0 ];
* var shape = [ 3, 2 ];
* var strides = [ 2, 1 ];
* var offset = 0;
*
* var x = ndarray( 'generic', buffer, shape, strides, offset, 'row-major' );
* // returns <ndarray>
*
* var sh = x.shape;
* // returns [ 3, 2 ]
*
* var arr = ndarray2array( x );
* // returns [ [ 1.0, 2.0 ], [ 3.0, 4.0 ], [ 5.0, 6.0 ] ]
*
* var s = [ 1, null ];
* var y = sliceFrom( x, s, false, false );
* // returns <ndarray>
*
* sh = y.shape;
* // returns [ 2, 2 ]
*
* arr = ndarray2array( y );
* // returns [ [ 3.0, 4.0 ], [ 5.0, 6.0 ] ]
*/
function sliceFrom( x, start, strict, writable ) {
	var args;
	var s;
	var i;

	args = [];
	for ( i = 0; i < start.length; i++ ) {
		s = start[ i ];
		if ( isNumber( s ) && s !== 0 ) { // note: a start value equal to 0 is equivalent to `null` (i.e., including all elements along a dimension)
			args.push( new Slice( s, null ) );
		} else {
			args.push( null );
		}
	}
	return slice( x, args2multislice( args ), strict, writable );
}


// EXPORTS //

module.exports = sliceFrom;
