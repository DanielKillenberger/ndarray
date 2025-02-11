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

var zeroTo = require( '@stdlib/array/base/zero-to' );
var copy = require( '@stdlib/array/base/copy-indexed' );
var take = require( '@stdlib/array/base/take' );
var filled = require( '@stdlib/array/base/filled' );
var strides2order = require( './../../../base/strides2order' );
var sort2ins = require( './sort2ins.js' );


// VARIABLES //

// Number of arrays:
var N = 3;


// MAIN //

/**
* Reorders ndarray dimensions and associated strides for loop interchange.
*
* ## Notes
*
* -   The returned object has the following properties:
*
*     -   **sh**: dimensions sorted in loop order.
*     -   **sx**: first input ndarray strides sorted in loop order.
*     -   **sy**: second input ndarray strides sorted in loop order.
*     -   **sz**: output ndarray strides sorted in loop order.
*
* @param {NonNegativeIntegerArray} sh - array dimensions
* @param {IntegerArray} sx - first input array stride lengths
* @param {IntegerArray} sy - second input array stride lengths
* @param {IntegerArray} sz - output array stride lengths
* @returns {Object} loop interchange data
*
* @example
* var sh = [ 2, 3, 4 ];
*
* var sx = [ 12, 4, 1 ]; // row-major
* var sy = [ 24, 8, 1 ]; // row-major
* var sz = [ 1, -2, 6 ]; // column-major
*
* var o = loopOrder( sh, sx, sy, sz );
* // returns {...}
*
* var ssh = o.sh;
* // returns [ 4, 3, 2 ]
*
* var ssx = o.sx;
* // returns [ 1, 4, 12 ]
*
* var ssy = o.sy;
* // returns [ 1, 8, 24 ]
*
* var ssz = o.sz;
* // returns [ 6, -2, 1 ]
*/
function loopOrder( sh, sx, sy, sz ) {
	var idx;
	var tmp;
	var max;
	var len;
	var arr;
	var ox;
	var oy;
	var oz;
	var i;
	var j;

	// Initialize a loop interchange index array for generating a loop order permutation:
	idx = zeroTo( sh.length );

	// Determine the order (layout) of each array:
	ox = strides2order( sx );
	oy = strides2order( sy );
	oz = strides2order( sz );

	// Determine which array should be used to generate the loop order:
	tmp = filled( [], 4 );
	tmp[ ox ].push( sx );
	tmp[ oy ].push( sy );
	tmp[ oz ].push( sz );
	max = tmp[ 0 ].length;
	if ( max === N ) {
		// If all arrays are "disorganized", then just use the first array, as, generally, each array is likely to be as un-ideal as every other:
		arr = sx;
	} else if ( max === N-1 ) {
		// If all but one array is "disorganized", find the "organized" array...
		for ( i = 1; i < 4; i++ ) {
			if ( tmp[ i ].length ) {
				arr = tmp[ i ][ 0 ];
				break;
			}
		}
	} else {
		// Find the layout which is most common...
		j = 0;
		for ( i = 1; i < 4; i++ ) {
			len = tmp[ i ].length;
			if ( len >= max ) {
				max = len;
				j = i;
			}
		}
		// Use the strides of the first array having the most common layout:
		arr = tmp[ j ][ 0 ];
	}
	// Sort array strides in increasing order (of magnitude):
	arr = copy( arr );
	sort2ins( arr, idx );

	// Permute the shape and array strides based on the sorted strides:
	sh = take( sh, idx );
	sx = ( sx === arr ) ? arr : take( sx, idx );
	sy = ( sy === arr ) ? arr : take( sy, idx );
	sz = ( sz === arr ) ? arr : take( sz, idx );

	return {
		'sh': sh,
		'sx': sx,
		'sy': sy,
		'sz': sz
	};
}


// EXPORTS //

module.exports = loopOrder;
