"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/messages/route";
exports.ids = ["app/api/messages/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmessages%2Froute&page=%2Fapi%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmessages%2Froute.ts&appDir=C%3A%5CUsers%5CADMIN%5CDocuments%5CGitHub%5CNonStopChat-Next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADMIN%5CDocuments%5CGitHub%5CNonStopChat-Next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmessages%2Froute&page=%2Fapi%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmessages%2Froute.ts&appDir=C%3A%5CUsers%5CADMIN%5CDocuments%5CGitHub%5CNonStopChat-Next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADMIN%5CDocuments%5CGitHub%5CNonStopChat-Next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_ADMIN_Documents_GitHub_NonStopChat_Next_app_api_messages_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/messages/route.ts */ \"(rsc)/./app/api/messages/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/messages/route\",\n        pathname: \"/api/messages\",\n        filename: \"route\",\n        bundlePath: \"app/api/messages/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\ADMIN\\\\Documents\\\\GitHub\\\\NonStopChat-Next\\\\app\\\\api\\\\messages\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_ADMIN_Documents_GitHub_NonStopChat_Next_app_api_messages_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/messages/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZtZXNzYWdlcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbWVzc2FnZXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZtZXNzYWdlcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNBRE1JTiU1Q0RvY3VtZW50cyU1Q0dpdEh1YiU1Q05vblN0b3BDaGF0LU5leHQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0FETUlOJTVDRG9jdW1lbnRzJTVDR2l0SHViJTVDTm9uU3RvcENoYXQtTmV4dCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDbUM7QUFDaEg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub25zdG9wLWNoYXQtbmV4dC8/ZGEwZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxBRE1JTlxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXE5vblN0b3BDaGF0LU5leHRcXFxcYXBwXFxcXGFwaVxcXFxtZXNzYWdlc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbWVzc2FnZXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9tZXNzYWdlc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbWVzc2FnZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxBRE1JTlxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXE5vblN0b3BDaGF0LU5leHRcXFxcYXBwXFxcXGFwaVxcXFxtZXNzYWdlc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvbWVzc2FnZXMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmessages%2Froute&page=%2Fapi%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmessages%2Froute.ts&appDir=C%3A%5CUsers%5CADMIN%5CDocuments%5CGitHub%5CNonStopChat-Next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADMIN%5CDocuments%5CGitHub%5CNonStopChat-Next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n\n\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Email et mot de passe requis\");\n                }\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user || !user.password) {\n                    throw new Error(\"Email ou mot de passe incorrect\");\n                }\n                const isPasswordValid = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_2__.compare)(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    throw new Error(\"Email ou mot de passe incorrect\");\n                }\n                // Mettre à jour le statut de l'utilisateur à \"online\"\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.update({\n                    where: {\n                        id: user.id\n                    },\n                    data: {\n                        status: \"online\"\n                    }\n                });\n                return {\n                    id: user.id,\n                    email: user.email,\n                    firstName: user.firstName,\n                    lastName: user.lastName,\n                    image: user.image || \"\"\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.firstName = user.firstName;\n                token.lastName = user.lastName;\n                token.image = user.image;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.firstName = token.firstName;\n                session.user.lastName = token.lastName;\n                session.user.image = token.image;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    debug: \"development\" === \"development\",\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = (0,next_auth_next__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBeUQ7QUFFUTtBQUMvQjtBQUNHO0FBQ0E7QUFFOUIsTUFBTUssY0FBK0I7SUFDMUNDLFNBQVNOLHdFQUFhQSxDQUFDRywrQ0FBTUE7SUFDN0JJLFdBQVc7UUFDVE4sMkVBQW1CQSxDQUFDO1lBQ2xCTyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pELE1BQU0sSUFBSUUsTUFBTTtnQkFDbEI7Z0JBRUEsTUFBTUMsT0FBTyxNQUFNYiwrQ0FBTUEsQ0FBQ2EsSUFBSSxDQUFDQyxVQUFVLENBQUM7b0JBQ3hDQyxPQUFPO3dCQUNMUixPQUFPRCxZQUFZQyxLQUFLO29CQUMxQjtnQkFDRjtnQkFFQSxJQUFJLENBQUNNLFFBQVEsQ0FBQ0EsS0FBS0gsUUFBUSxFQUFFO29CQUMzQixNQUFNLElBQUlFLE1BQU07Z0JBQ2xCO2dCQUVBLE1BQU1JLGtCQUFrQixNQUFNakIsaURBQU9BLENBQ25DTyxZQUFZSSxRQUFRLEVBQ3BCRyxLQUFLSCxRQUFRO2dCQUdmLElBQUksQ0FBQ00saUJBQWlCO29CQUNwQixNQUFNLElBQUlKLE1BQU07Z0JBQ2xCO2dCQUVBLHNEQUFzRDtnQkFDdEQsTUFBTVosK0NBQU1BLENBQUNhLElBQUksQ0FBQ0ksTUFBTSxDQUFDO29CQUN2QkYsT0FBTzt3QkFBRUcsSUFBSUwsS0FBS0ssRUFBRTtvQkFBQztvQkFDckJDLE1BQU07d0JBQUVDLFFBQVE7b0JBQVM7Z0JBQzNCO2dCQUVBLE9BQU87b0JBQ0xGLElBQUlMLEtBQUtLLEVBQUU7b0JBQ1hYLE9BQU9NLEtBQUtOLEtBQUs7b0JBQ2pCYyxXQUFXUixLQUFLUSxTQUFTO29CQUN6QkMsVUFBVVQsS0FBS1MsUUFBUTtvQkFDdkJDLE9BQU9WLEtBQUtVLEtBQUssSUFBSTtnQkFDdkI7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFYixJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUmEsTUFBTVIsRUFBRSxHQUFHTCxLQUFLSyxFQUFFO2dCQUNsQlEsTUFBTUwsU0FBUyxHQUFHUixLQUFLUSxTQUFTO2dCQUNoQ0ssTUFBTUosUUFBUSxHQUFHVCxLQUFLUyxRQUFRO2dCQUM5QkksTUFBTUgsS0FBSyxHQUFHVixLQUFLVSxLQUFLO1lBQzFCO1lBQ0EsT0FBT0c7UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsT0FBTztnQkFDVEMsUUFBUWQsSUFBSSxDQUFDSyxFQUFFLEdBQUdRLE1BQU1SLEVBQUU7Z0JBQzFCUyxRQUFRZCxJQUFJLENBQUNRLFNBQVMsR0FBR0ssTUFBTUwsU0FBUztnQkFDeENNLFFBQVFkLElBQUksQ0FBQ1MsUUFBUSxHQUFHSSxNQUFNSixRQUFRO2dCQUN0Q0ssUUFBUWQsSUFBSSxDQUFDVSxLQUFLLEdBQUdHLE1BQU1ILEtBQUs7WUFDbEM7WUFDQSxPQUFPSTtRQUNUO0lBQ0Y7SUFDQUMsT0FBTztRQUNMQyxRQUFRO0lBQ1Y7SUFDQUMsT0FBT0Msa0JBQXlCO0lBQ2hDSixTQUFTO1FBQ1BLLFVBQVU7SUFDWjtJQUNBQyxRQUFRRixRQUFRRyxHQUFHLENBQUNDLGVBQWU7QUFDckMsRUFBQztBQUVELE1BQU1DLFVBQVVuQywwREFBUUEsQ0FBQ0M7QUFFaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub25zdG9wLWNoYXQtbmV4dC8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gXCJAbmV4dC1hdXRoL3ByaXNtYS1hZGFwdGVyXCJcbmltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIlxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIlxuaW1wb3J0IHsgY29tcGFyZSB9IGZyb20gXCJiY3J5cHRqc1wiXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCJcbmltcG9ydCBOZXh0QXV0aCBmcm9tIFwibmV4dC1hdXRoL25leHRcIlxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgYWRhcHRlcjogUHJpc21hQWRhcHRlcihwcmlzbWEpLFxuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiY3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfVxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW1haWwgZXQgbW90IGRlIHBhc3NlIHJlcXVpc1wiKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBlbWFpbDogY3JlZGVudGlhbHMuZW1haWxcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLnBhc3N3b3JkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW1haWwgb3UgbW90IGRlIHBhc3NlIGluY29ycmVjdFwiKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNQYXNzd29yZFZhbGlkID0gYXdhaXQgY29tcGFyZShcbiAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkXG4gICAgICAgIClcblxuICAgICAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVtYWlsIG91IG1vdCBkZSBwYXNzZSBpbmNvcnJlY3RcIilcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGxlIHN0YXR1dCBkZSBsJ3V0aWxpc2F0ZXVyIMOgIFwib25saW5lXCJcbiAgICAgICAgYXdhaXQgcHJpc21hLnVzZXIudXBkYXRlKHtcbiAgICAgICAgICB3aGVyZTogeyBpZDogdXNlci5pZCB9LFxuICAgICAgICAgIGRhdGE6IHsgc3RhdHVzOiBcIm9ubGluZVwiIH1cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgIGZpcnN0TmFtZTogdXNlci5maXJzdE5hbWUsXG4gICAgICAgICAgbGFzdE5hbWU6IHVzZXIubGFzdE5hbWUsXG4gICAgICAgICAgaW1hZ2U6IHVzZXIuaW1hZ2UgfHwgXCJcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkXG4gICAgICAgIHRva2VuLmZpcnN0TmFtZSA9IHVzZXIuZmlyc3ROYW1lXG4gICAgICAgIHRva2VuLmxhc3ROYW1lID0gdXNlci5sYXN0TmFtZVxuICAgICAgICB0b2tlbi5pbWFnZSA9IHVzZXIuaW1hZ2VcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlblxuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmdcbiAgICAgICAgc2Vzc2lvbi51c2VyLmZpcnN0TmFtZSA9IHRva2VuLmZpcnN0TmFtZSBhcyBzdHJpbmdcbiAgICAgICAgc2Vzc2lvbi51c2VyLmxhc3ROYW1lID0gdG9rZW4ubGFzdE5hbWUgYXMgc3RyaW5nXG4gICAgICAgIHNlc3Npb24udXNlci5pbWFnZSA9IHRva2VuLmltYWdlIGFzIHN0cmluZ1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb25cbiAgICB9XG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiBcIi9sb2dpblwiLFxuICB9LFxuICBkZWJ1ZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIixcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn1cblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKVxuXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH1cbiJdLCJuYW1lcyI6WyJQcmlzbWFBZGFwdGVyIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImNvbXBhcmUiLCJwcmlzbWEiLCJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJFcnJvciIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpc1Bhc3N3b3JkVmFsaWQiLCJ1cGRhdGUiLCJpZCIsImRhdGEiLCJzdGF0dXMiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsImltYWdlIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJzZXNzaW9uIiwicGFnZXMiLCJzaWduSW4iLCJkZWJ1ZyIsInByb2Nlc3MiLCJzdHJhdGVneSIsInNlY3JldCIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCIsImhhbmRsZXIiLCJHRVQiLCJQT1NUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/messages/route.ts":
/*!***********************************!*\
  !*** ./app/api/messages/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _auth_nextauth_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../auth/[...nextauth]/route */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/dist/esm/index.js\");\n\n\n\n\n\n// Schéma de validation pour la création de message\nconst messageSchema = zod__WEBPACK_IMPORTED_MODULE_4__.z.object({\n    content: zod__WEBPACK_IMPORTED_MODULE_4__.z.string().min(1, \"Le contenu du message est requis\"),\n    recipientId: zod__WEBPACK_IMPORTED_MODULE_4__.z.string().uuid(\"ID de destinataire invalide\")\n});\nasync function POST(request) {\n    try {\n        // Vérifier si l'utilisateur est authentifié\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Non autoris\\xe9\"\n            }, {\n                status: 401\n            });\n        }\n        // Valider les données du message\n        const body = await request.json();\n        const validationResult = messageSchema.safeParse(body);\n        if (!validationResult.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Donn\\xe9es invalides\",\n                errors: validationResult.error.format()\n            }, {\n                status: 400\n            });\n        }\n        const { content, recipientId } = validationResult.data;\n        // Vérifier si le destinataire existe\n        const recipient = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n            where: {\n                id: recipientId\n            }\n        });\n        if (!recipient) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Destinataire non trouv\\xe9\"\n            }, {\n                status: 404\n            });\n        }\n        // Créer le message avec Prisma\n        const message = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.message.create({\n            data: {\n                content,\n                senderId: session.user.id,\n                recipientId\n            }\n        });\n        // Utiliser le message créé par Prisma pour la réponse\n        const messageData = {\n            ...message,\n            // Ajouter explicitement les propriétés pour éviter les erreurs TypeScript\n            id: message.id,\n            content: message.content,\n            senderId: message.senderId,\n            recipientId: message.recipientId,\n            createdAt: message.createdAt\n        };\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Message envoy\\xe9 avec succ\\xe8s\",\n            data: messageData\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Erreur lors de l'envoi du message:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Une erreur est survenue lors de l'envoi du message\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function GET(request) {\n    try {\n        // Vérifier si l'utilisateur est authentifié\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Non autoris\\xe9\"\n            }, {\n                status: 401\n            });\n        }\n        // Récupérer l'ID du destinataire depuis les paramètres de requête\n        const { searchParams } = new URL(request.url);\n        const recipientId = searchParams.get(\"recipientId\");\n        if (!recipientId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"ID du destinataire requis\"\n            }, {\n                status: 400\n            });\n        }\n        // Récupérer les messages entre l'utilisateur actuel et le destinataire\n        const messages = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.message.findMany({\n            where: {\n                OR: [\n                    {\n                        senderId: session.user.id,\n                        recipientId\n                    },\n                    {\n                        senderId: recipientId,\n                        recipientId: session.user.id\n                    }\n                ]\n            },\n            orderBy: {\n                createdAt: \"asc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            messages\n        });\n    } catch (error) {\n        console.error(\"Erreur lors de la r\\xe9cup\\xe9ration des messages:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Une erreur est survenue lors de la r\\xe9cup\\xe9ration des messages\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MkIsYUFBYUcsR0FBRyxDQUFDO1FBRXJDLElBQUksQ0FBQzlCLGFBQWE7WUFDaEIsT0FBT1YscURBQVlBLENBQUNnQixJQUFJLENBQ3RCO2dCQUFFQyxTQUFTO1lBQTRCLEdBQ3ZDO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7UUFFQSx1RUFBdUU7UUFDdkUsTUFBTXVCLFdBQVcsTUFBTXhDLCtDQUFNQSxDQUFDZ0IsT0FBTyxDQUFDeUIsUUFBUSxDQUFDO1lBQzdDYixPQUFPO2dCQUNMYyxJQUFJO29CQUNGO3dCQUFFWCxVQUFVbEIsUUFBUUMsSUFBSSxDQUFDZSxFQUFFO3dCQUFFcEI7b0JBQVk7b0JBQ3pDO3dCQUFFc0IsVUFBVXRCO3dCQUFhQSxhQUFhSSxRQUFRQyxJQUFJLENBQUNlLEVBQUU7b0JBQUM7aUJBQ3ZEO1lBQ0g7WUFDQWMsU0FBUztnQkFDUFYsV0FBVztZQUNiO1FBQ0Y7UUFFQSxPQUFPbEMscURBQVlBLENBQUNnQixJQUFJLENBQUM7WUFBRXlCO1FBQVM7SUFDdEMsRUFBRSxPQUFPakIsT0FBTztRQUNkVyxRQUFRWCxLQUFLLENBQUMsc0RBQWdEQTtRQUM5RCxPQUFPeEIscURBQVlBLENBQUNnQixJQUFJLENBQ3RCO1lBQUVDLFNBQVM7UUFBK0QsR0FDMUU7WUFBRUMsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub25zdG9wLWNoYXQtbmV4dC8uL2FwcC9hcGkvbWVzc2FnZXMvcm91dGUudHM/MGZlMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIlxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIlxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiLi4vYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbmltcG9ydCB7IHogfSBmcm9tIFwiem9kXCJcblxuLy8gU2Now6ltYSBkZSB2YWxpZGF0aW9uIHBvdXIgbGEgY3LDqWF0aW9uIGRlIG1lc3NhZ2VcbmNvbnN0IG1lc3NhZ2VTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIGNvbnRlbnQ6IHouc3RyaW5nKCkubWluKDEsIFwiTGUgY29udGVudSBkdSBtZXNzYWdlIGVzdCByZXF1aXNcIiksXG4gIHJlY2lwaWVudElkOiB6LnN0cmluZygpLnV1aWQoXCJJRCBkZSBkZXN0aW5hdGFpcmUgaW52YWxpZGVcIiksXG59KVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIC8vIFbDqXJpZmllciBzaSBsJ3V0aWxpc2F0ZXVyIGVzdCBhdXRoZW50aWZpw6lcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcbiAgICBcbiAgICBpZiAoIXNlc3Npb24/LnVzZXIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBtZXNzYWdlOiBcIk5vbiBhdXRvcmlzw6lcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAxIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBWYWxpZGVyIGxlcyBkb25uw6llcyBkdSBtZXNzYWdlXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpXG4gICAgY29uc3QgdmFsaWRhdGlvblJlc3VsdCA9IG1lc3NhZ2VTY2hlbWEuc2FmZVBhcnNlKGJvZHkpXG5cbiAgICBpZiAoIXZhbGlkYXRpb25SZXN1bHQuc3VjY2Vzcykge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IG1lc3NhZ2U6IFwiRG9ubsOpZXMgaW52YWxpZGVzXCIsIGVycm9yczogdmFsaWRhdGlvblJlc3VsdC5lcnJvci5mb3JtYXQoKSB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCB7IGNvbnRlbnQsIHJlY2lwaWVudElkIH0gPSB2YWxpZGF0aW9uUmVzdWx0LmRhdGFcblxuICAgIC8vIFbDqXJpZmllciBzaSBsZSBkZXN0aW5hdGFpcmUgZXhpc3RlXG4gICAgY29uc3QgcmVjaXBpZW50ID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcmVjaXBpZW50SWQgfSxcbiAgICB9KVxuXG4gICAgaWYgKCFyZWNpcGllbnQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBtZXNzYWdlOiBcIkRlc3RpbmF0YWlyZSBub24gdHJvdXbDqVwiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDQgfVxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIENyw6llciBsZSBtZXNzYWdlIGF2ZWMgUHJpc21hXG4gICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHByaXNtYS5tZXNzYWdlLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGNvbnRlbnQsXG4gICAgICAgIHNlbmRlcklkOiBzZXNzaW9uLnVzZXIuaWQsXG4gICAgICAgIHJlY2lwaWVudElkLFxuICAgICAgICAvLyBMZSBjaGFtcCBpc1JlYWQgc2VyYSBhdXRvbWF0aXF1ZW1lbnQgZMOpZmluaSDDoCBmYWxzZSBncsOiY2UgYXUgQGRlZmF1bHQoZmFsc2UpIGRhbnMgbGUgc2Now6ltYVxuICAgICAgfSxcbiAgICB9KVxuICAgIFxuICAgIC8vIFV0aWxpc2VyIGxlIG1lc3NhZ2UgY3LDqcOpIHBhciBQcmlzbWEgcG91ciBsYSByw6lwb25zZVxuICAgIGNvbnN0IG1lc3NhZ2VEYXRhID0ge1xuICAgICAgLi4ubWVzc2FnZSxcbiAgICAgIC8vIEFqb3V0ZXIgZXhwbGljaXRlbWVudCBsZXMgcHJvcHJpw6l0w6lzIHBvdXIgw6l2aXRlciBsZXMgZXJyZXVycyBUeXBlU2NyaXB0XG4gICAgICBpZDogbWVzc2FnZS5pZCxcbiAgICAgIGNvbnRlbnQ6IG1lc3NhZ2UuY29udGVudCxcbiAgICAgIHNlbmRlcklkOiBtZXNzYWdlLnNlbmRlcklkLFxuICAgICAgcmVjaXBpZW50SWQ6IG1lc3NhZ2UucmVjaXBpZW50SWQsXG4gICAgICBjcmVhdGVkQXQ6IG1lc3NhZ2UuY3JlYXRlZEF0XG4gICAgfVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBtZXNzYWdlOiBcIk1lc3NhZ2UgZW52b3nDqSBhdmVjIHN1Y2PDqHNcIiwgZGF0YTogbWVzc2FnZURhdGEgfSxcbiAgICAgIHsgc3RhdHVzOiAyMDEgfVxuICAgIClcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbCdlbnZvaSBkdSBtZXNzYWdlOlwiLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IG1lc3NhZ2U6IFwiVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsJ2Vudm9pIGR1IG1lc3NhZ2VcIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICAvLyBWw6lyaWZpZXIgc2kgbCd1dGlsaXNhdGV1ciBlc3QgYXV0aGVudGlmacOpXG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXG4gICAgXG4gICAgaWYgKCFzZXNzaW9uPy51c2VyKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgbWVzc2FnZTogXCJOb24gYXV0b3Jpc8OpXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApXG4gICAgfVxuXG4gICAgLy8gUsOpY3Vww6lyZXIgbCdJRCBkdSBkZXN0aW5hdGFpcmUgZGVwdWlzIGxlcyBwYXJhbcOodHJlcyBkZSByZXF1w6p0ZVxuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcXVlc3QudXJsKVxuICAgIGNvbnN0IHJlY2lwaWVudElkID0gc2VhcmNoUGFyYW1zLmdldCgncmVjaXBpZW50SWQnKVxuXG4gICAgaWYgKCFyZWNpcGllbnRJZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IG1lc3NhZ2U6IFwiSUQgZHUgZGVzdGluYXRhaXJlIHJlcXVpc1wiIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIFLDqWN1cMOpcmVyIGxlcyBtZXNzYWdlcyBlbnRyZSBsJ3V0aWxpc2F0ZXVyIGFjdHVlbCBldCBsZSBkZXN0aW5hdGFpcmVcbiAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IHByaXNtYS5tZXNzYWdlLmZpbmRNYW55KHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIE9SOiBbXG4gICAgICAgICAgeyBzZW5kZXJJZDogc2Vzc2lvbi51c2VyLmlkLCByZWNpcGllbnRJZCB9LFxuICAgICAgICAgIHsgc2VuZGVySWQ6IHJlY2lwaWVudElkLCByZWNpcGllbnRJZDogc2Vzc2lvbi51c2VyLmlkIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgb3JkZXJCeToge1xuICAgICAgICBjcmVhdGVkQXQ6ICdhc2MnLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgbWVzc2FnZXMgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZGUgbGEgcsOpY3Vww6lyYXRpb24gZGVzIG1lc3NhZ2VzOlwiLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IG1lc3NhZ2U6IFwiVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgbWVzc2FnZXNcIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKVxuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicHJpc21hIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwieiIsIm1lc3NhZ2VTY2hlbWEiLCJvYmplY3QiLCJjb250ZW50Iiwic3RyaW5nIiwibWluIiwicmVjaXBpZW50SWQiLCJ1dWlkIiwiUE9TVCIsInJlcXVlc3QiLCJzZXNzaW9uIiwidXNlciIsImpzb24iLCJtZXNzYWdlIiwic3RhdHVzIiwiYm9keSIsInZhbGlkYXRpb25SZXN1bHQiLCJzYWZlUGFyc2UiLCJzdWNjZXNzIiwiZXJyb3JzIiwiZXJyb3IiLCJmb3JtYXQiLCJkYXRhIiwicmVjaXBpZW50IiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaWQiLCJjcmVhdGUiLCJzZW5kZXJJZCIsIm1lc3NhZ2VEYXRhIiwiY3JlYXRlZEF0IiwiY29uc29sZSIsIkdFVCIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsImdldCIsIm1lc3NhZ2VzIiwiZmluZE1hbnkiLCJPUiIsIm9yZGVyQnkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/messages/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7S0FBUTtBQUNoQixHQUFFO0FBRUosSUFBSUMsSUFBeUIsRUFBY0osZ0JBQWdCRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbm9uc3RvcC1jaGF0LW5leHQvLi9saWIvcHJpc21hLnRzPzk4MjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbCBhcyB1bmtub3duIGFzIHsgcHJpc21hOiBQcmlzbWFDbGllbnQgfVxuXG5leHBvcnQgY29uc3QgcHJpc21hID1cbiAgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSB8fFxuICBuZXcgUHJpc21hQ2xpZW50KHtcbiAgICBsb2c6IFsncXVlcnknXSxcbiAgfSlcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWFcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWwiLCJwcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmessages%2Froute&page=%2Fapi%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmessages%2Froute.ts&appDir=C%3A%5CUsers%5CADMIN%5CDocuments%5CGitHub%5CNonStopChat-Next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CADMIN%5CDocuments%5CGitHub%5CNonStopChat-Next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();