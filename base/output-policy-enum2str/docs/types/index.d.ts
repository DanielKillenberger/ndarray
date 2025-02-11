/*
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

// TypeScript Version: 4.1

/**
* Returns the policy string associated with an output ndarray data type policy enumeration constant.
*
* @param policy - policy enumeration constant
* @returns policy string
*
* @example
* var str2enum = require( `@stdlib/ndarray/base/output-policy-str2enum` );
*
* var v = str2enum( 'same' );
* // returns <number>
*
* var policy = enum2str( v );
* // returns 'same'
*/
declare function enum2str( policy: number ): string | null;


// EXPORTS //

export = enum2str;
