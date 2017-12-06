# Jsunpack struct helper

This module allows you to use jsunpack and it's python pack/unpack format strings to generate full structures in javascript.

It works at both node.js and browsers.

# Installation

Use:

    npm run build

to build the module.

Use:

    npm run generate-docs

to generate the documentation

# Usage

To generate a struct you must first define the schema. Schemas are defined as arrays of objects, each one containing a name and a type.

A sample schema is the following:

	const mySchema = [
	  { name: 'myByteField', type: 'B' },
	  { name: 'myShortField', type: 'H' },
	  { name: 'aString', type: '5s' }
	];

You can then parse an ArrayBuffer using:

	const myStruct = jsunpackstruct.objParse(buffer, mySchema);
	console.log(myStruct.aString);

You can also pass an `offset` as the third argument to `objParse`.

To get the size of an object, you can use `objSize`:

	const mySchemaSize = jsunpackstruct.objSize(mySchema);
	console.log(mySchemaSize); // 8

You can also get information on specific fields inside a struct.

	const offsetOfShort = jsunpackstruct.objOffsetOf(mySchema, 'myShortField');
	console.log(offsetOfShort); // 1
	const sizeOfShort = jsunpackstruct.objSizeOf(mySchema, 'myShortField');
	console.log(sizeOfShort); // 2

# License

Copyright (c) 2017, Fotis Loukos
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
