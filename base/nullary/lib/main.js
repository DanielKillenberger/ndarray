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

var iterationOrder = require( './../../../base/iteration-order' );
var minmaxViewBufferIndex = require( './../../../base/minmax-view-buffer-index' );
var ndarray2object = require( './../../../base/ndarraylike2object' );
var blockedaccessornullary2d = require( './2d_blocked_accessors.js' );
var blockedaccessornullary3d = require( './3d_blocked_accessors.js' );
var blockedaccessornullary4d = require( './4d_blocked_accessors.js' );
var blockedaccessornullary5d = require( './5d_blocked_accessors.js' );
var blockedaccessornullary6d = require( './6d_blocked_accessors.js' );
var blockedaccessornullary7d = require( './7d_blocked_accessors.js' );
var blockedaccessornullary8d = require( './8d_blocked_accessors.js' );
var blockedaccessornullary9d = require( './9d_blocked_accessors.js' );
var blockedaccessornullary10d = require( './10d_blocked_accessors.js' );
var blockednullary2d = require( './2d_blocked.js' );
var blockednullary3d = require( './3d_blocked.js' );
var blockednullary4d = require( './4d_blocked.js' );
var blockednullary5d = require( './5d_blocked.js' );
var blockednullary6d = require( './6d_blocked.js' );
var blockednullary7d = require( './7d_blocked.js' );
var blockednullary8d = require( './8d_blocked.js' );
var blockednullary9d = require( './9d_blocked.js' );
var blockednullary10d = require( './10d_blocked.js' );
var accessornullary0d = require( './0d_accessors.js' );
var accessornullary1d = require( './1d_accessors.js' );
var accessornullary2d = require( './2d_accessors.js' );
var accessornullary3d = require( './3d_accessors.js' );
var accessornullary4d = require( './4d_accessors.js' );
var accessornullary5d = require( './5d_accessors.js' );
var accessornullary6d = require( './6d_accessors.js' );
var accessornullary7d = require( './7d_accessors.js' );
var accessornullary8d = require( './8d_accessors.js' );
var accessornullary9d = require( './9d_accessors.js' );
var accessornullary10d = require( './10d_accessors.js' );
var accessornullarynd = require( './nd_accessors.js' );
var nullary0d = require( './0d.js' );
var nullary1d = require( './1d.js' );
var nullary2d = require( './2d.js' );
var nullary3d = require( './3d.js' );
var nullary4d = require( './4d.js' );
var nullary5d = require( './5d.js' );
var nullary6d = require( './6d.js' );
var nullary7d = require( './7d.js' );
var nullary8d = require( './8d.js' );
var nullary9d = require( './9d.js' );
var nullary10d = require( './10d.js' );
var nullarynd = require( './nd.js' );


// VARIABLES //

var NULLARY = [
	nullary0d,
	nullary1d,
	nullary2d,
	nullary3d,
	nullary4d,
	nullary5d,
	nullary6d,
	nullary7d,
	nullary8d,
	nullary9d,
	nullary10d
];
var ACCESSOR_NULLARY = [
	accessornullary0d,
	accessornullary1d,
	accessornullary2d,
	accessornullary3d,
	accessornullary4d,
	accessornullary5d,
	accessornullary6d,
	accessornullary7d,
	accessornullary8d,
	accessornullary9d,
	accessornullary10d
];
var BLOCKED_NULLARY = [
	blockednullary2d, // 0
	blockednullary3d,
	blockednullary4d,
	blockednullary5d,
	blockednullary6d,
	blockednullary7d,
	blockednullary8d,
	blockednullary9d,
	blockednullary10d // 8
];
var BLOCKED_ACCESSOR_NULLARY = [
	blockedaccessornullary2d, // 0
	blockedaccessornullary3d,
	blockedaccessornullary4d,
	blockedaccessornullary5d,
	blockedaccessornullary6d,
	blockedaccessornullary7d,
	blockedaccessornullary8d,
	blockedaccessornullary9d,
	blockedaccessornullary10d // 8
];
var MAX_DIMS = NULLARY.length - 1;


// MAIN //

/**
* Applies a nullary function and assigns results to elements in an output ndarray.
*
* ## Notes
*
* -   A provided ndarray should be an `object` with the following properties:
*
*     -   **dtype**: data type.
*     -   **data**: data buffer.
*     -   **shape**: dimensions.
*     -   **strides**: stride lengths.
*     -   **offset**: index offset.
*     -   **order**: specifies whether an ndarray is row-major (C-style) or column major (Fortran-style).
*
* @param {ArrayLikeObject<Object>} arrays - array-like object containing one output array
* @param {Callback} fcn - nullary callback
* @returns {void}
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
*
* function fcn() {
*     return 10.0;
* }
*
* // Create a data buffer:
* var xbuf = new Float64Array( 12 );
*
* // Define the shape of the output array:
* var shape = [ 3, 1, 2 ];
*
* // Define the array strides:
* var sx = [ 4, 4, 1 ];
*
* // Define the index offset:
* var ox = 1;
*
* // Create the ioutput ndarray-like objects:
* var x = {
*     'dtype': 'float64',
*     'data': xbuf,
*     'shape': shape,
*     'strides': sx,
*     'offset': ox,
*     'order': 'row-major'
* };
*
* // Apply the nullary function:
* nullary( [ x ], fcn );
*
* console.log( x.data );
* // => <Float64Array>[ 0.0, 10.0, 10.0, 0.0, 0.0, 10.0, 10.0, 0.0, 0.0, 10.0, 10.0, 0.0 ]
*/
function nullary( arrays, fcn ) {
	var ndims;
	var xmmv;
	var shx;
	var iox;
	var len;
	var sx;
	var ox;
	var ns;
	var x;
	var d;
	var i;

	// Unpack the ndarray and standardize ndarray meta data:
	x = ndarray2object( arrays[ 0 ] );
	shx = x.shape;
	ndims = shx.length;

	// Determine whether we can avoid iteration altogether...
	if ( ndims === 0 ) {
		if ( x.accessorProtocol ) {
			return ACCESSOR_NULLARY[ ndims ]( x, fcn );
		}
		return NULLARY[ ndims ]( x, fcn );
	}
	// Compute the number of elements and the number of singleton dimensions...
	len = 1; // number of elements
	ns = 0;  // number of singleton dimensions
	for ( i = 0; i < ndims; i++ ) {
		d = shx[ i ];

		// Note that, if one of the dimensions is `0`, the length will be `0`...
		len *= d;

		// Check whether the current dimension is a singleton dimension...
		if ( d === 1 ) {
			ns += 1;
		}
	}
	// Check whether we were provided an empty ndarray...
	if ( len === 0 ) {
		return;
	}
	// Determine whether the ndarray is one-dimensional and thus readily translates to a one-dimensional strided array...
	if ( ndims === 1 ) {
		if ( x.accessorProtocol ) {
			return ACCESSOR_NULLARY[ ndims ]( x, fcn );
		}
		return NULLARY[ ndims ]( x, fcn );
	}
	sx = x.strides;

	// Determine whether the ndarray has only **one** non-singleton dimension (e.g., ndims=4, shape=[10,1,1,1]) so that we can treat an ndarray as being equivalent to a one-dimensional strided array...
	if ( ns === ndims-1 ) {
		// Get the index of the non-singleton dimension...
		for ( i = 0; i < ndims; i++ ) {
			if ( shx[ i ] !== 1 ) {
				break;
			}
		}
		x.shape = [ shx[i] ];
		x.strides = [ sx[i] ];
		if ( x.accessorProtocol ) {
			return ACCESSOR_NULLARY[ 1 ]( x, fcn );
		}
		return NULLARY[ 1 ]( x, fcn );
	}
	iox = iterationOrder( sx ); // +/-1

	// Determine whether we can avoid blocked iteration...
	if ( iox !== 0 ) {
		// Determine the minimum and maximum linear indices which are accessible by the array view:
		xmmv = minmaxViewBufferIndex( shx, sx, x.offset );

		// Determine whether we can ignore shape (and strides) and treat the ndarray as a linear one-dimensional strided array...
		if ( len === ( xmmv[1]-xmmv[0]+1 ) ) {
			// Note: the above is equivalent to @stdlib/ndarray/base/assert/is-contiguous, but in-lined so we can retain computed values...
			if ( iox === 1 ) {
				ox = xmmv[ 0 ];
			} else {
				ox = xmmv[ 1 ];
			}
			x.shape = [ len ];
			x.strides = [ iox ];
			x.offset = ox;
			if ( x.accessorProtocol ) {
				return ACCESSOR_NULLARY[ 1 ]( x, fcn );
			}
			return NULLARY[ 1 ]( x, fcn );
		}
		// The ndarray is non-contiguous, so we cannot directly use one-dimensional array functionality...

		// Determine whether we can use simple nested loops...
		if ( ndims <= MAX_DIMS ) {
			// So long as iteration always moves in the same direction (i.e., no mixed sign strides), we can leverage cache-optimal (i.e., normal) nested loops without resorting to blocked iteration...
			if ( x.accessorProtocol ) {
				return ACCESSOR_NULLARY[ ndims ]( x, fcn );
			}
			return NULLARY[ ndims ]( x, fcn );
		}
		// Fall-through to blocked iteration...
	}
	// At this point, we're either dealing with a non-contiguous n-dimensional array or a high dimensional n-dimensional array, so our only hope is that we can still perform blocked iteration...

	// Determine whether we can perform blocked iteration...
	if ( ndims <= MAX_DIMS ) {
		if ( x.accessorProtocol ) {
			return BLOCKED_ACCESSOR_NULLARY[ ndims-2 ]( x, fcn );
		}
		return BLOCKED_NULLARY[ ndims-2 ]( x, fcn );
	}
	// Fall-through to linear view iteration without regard for how data is stored in memory (i.e., take the slow path)...
	if ( x.accessorProtocol ) {
		return accessornullarynd( x, fcn );
	}
	nullarynd( x, fcn );
}


// EXPORTS //

module.exports = nullary;
