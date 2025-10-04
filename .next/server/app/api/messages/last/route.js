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
exports.id = "app/api/messages/last/route";
exports.ids = ["app/api/messages/last/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmessages%2Flast%2Froute&page=%2Fapi%2Fmessages%2Flast%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmessages%2Flast%2Froute.ts&appDir=C%3A%5CUsers%5CVICTUS%5CDocuments%5CGitHub%5Cnon_stop_chat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CVICTUS%5CDocuments%5CGitHub%5Cnon_stop_chat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmessages%2Flast%2Froute&page=%2Fapi%2Fmessages%2Flast%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmessages%2Flast%2Froute.ts&appDir=C%3A%5CUsers%5CVICTUS%5CDocuments%5CGitHub%5Cnon_stop_chat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CVICTUS%5CDocuments%5CGitHub%5Cnon_stop_chat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_VICTUS_Documents_GitHub_non_stop_chat_app_api_messages_last_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/messages/last/route.ts */ \"(rsc)/./app/api/messages/last/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/messages/last/route\",\n        pathname: \"/api/messages/last\",\n        filename: \"route\",\n        bundlePath: \"app/api/messages/last/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\VICTUS\\\\Documents\\\\GitHub\\\\non_stop_chat\\\\app\\\\api\\\\messages\\\\last\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_VICTUS_Documents_GitHub_non_stop_chat_app_api_messages_last_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/messages/last/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZtZXNzYWdlcyUyRmxhc3QlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRm1lc3NhZ2VzJTJGbGFzdCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRm1lc3NhZ2VzJTJGbGFzdCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNWSUNUVVMlNUNEb2N1bWVudHMlNUNHaXRIdWIlNUNub25fc3RvcF9jaGF0JTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNWSUNUVVMlNUNEb2N1bWVudHMlNUNHaXRIdWIlNUNub25fc3RvcF9jaGF0JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUN1QztBQUNwSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL25vbnN0b3AtY2hhdC1uZXh0Lz82ZDBiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFZJQ1RVU1xcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXG5vbl9zdG9wX2NoYXRcXFxcYXBwXFxcXGFwaVxcXFxtZXNzYWdlc1xcXFxsYXN0XFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9tZXNzYWdlcy9sYXN0L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvbWVzc2FnZXMvbGFzdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbWVzc2FnZXMvbGFzdC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXFZJQ1RVU1xcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXG5vbl9zdG9wX2NoYXRcXFxcYXBwXFxcXGFwaVxcXFxtZXNzYWdlc1xcXFxsYXN0XFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9tZXNzYWdlcy9sYXN0L3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmessages%2Flast%2Froute&page=%2Fapi%2Fmessages%2Flast%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmessages%2Flast%2Froute.ts&appDir=C%3A%5CUsers%5CVICTUS%5CDocuments%5CGitHub%5Cnon_stop_chat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CVICTUS%5CDocuments%5CGitHub%5Cnon_stop_chat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n\n\n\n\n\n// Forcer le rendu dynamique pour cette route\nconst dynamic = \"force-dynamic\";\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Email et mot de passe requis\");\n                }\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user || !user.password) {\n                    throw new Error(\"Email ou mot de passe incorrect\");\n                }\n                const isPasswordValid = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_2__.compare)(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    throw new Error(\"Email ou mot de passe incorrect\");\n                }\n                // Mettre à jour le statut de l'utilisateur à \"online\"\n                await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.update({\n                    where: {\n                        id: user.id\n                    },\n                    data: {\n                        status: \"online\"\n                    }\n                });\n                return {\n                    id: user.id,\n                    email: user.email,\n                    firstName: user.firstName,\n                    lastName: user.lastName,\n                    image: user.image || \"\"\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.firstName = user.firstName;\n                token.lastName = user.lastName;\n                token.image = user.image;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.firstName = token.firstName;\n                session.user.lastName = token.lastName;\n                session.user.image = token.image;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    debug: \"development\" === \"development\",\n    session: {\n        strategy: \"jwt\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = (0,next_auth_next__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQXlEO0FBRVE7QUFDL0I7QUFDRztBQUNBO0FBRXJDLDZDQUE2QztBQUN0QyxNQUFNSyxVQUFVLGdCQUFlO0FBRS9CLE1BQU1DLGNBQStCO0lBQzFDQyxTQUFTUCx3RUFBYUEsQ0FBQ0csK0NBQU1BO0lBQzdCSyxXQUFXO1FBQ1RQLDJFQUFtQkEsQ0FBQztZQUNsQlEsTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVO29CQUNqRCxNQUFNLElBQUlFLE1BQU07Z0JBQ2xCO2dCQUVBLE1BQU1DLE9BQU8sTUFBTWQsK0NBQU1BLENBQUNjLElBQUksQ0FBQ0MsVUFBVSxDQUFDO29CQUN4Q0MsT0FBTzt3QkFDTFIsT0FBT0QsWUFBWUMsS0FBSztvQkFDMUI7Z0JBQ0Y7Z0JBRUEsSUFBSSxDQUFDTSxRQUFRLENBQUNBLEtBQUtILFFBQVEsRUFBRTtvQkFDM0IsTUFBTSxJQUFJRSxNQUFNO2dCQUNsQjtnQkFFQSxNQUFNSSxrQkFBa0IsTUFBTWxCLGlEQUFPQSxDQUNuQ1EsWUFBWUksUUFBUSxFQUNwQkcsS0FBS0gsUUFBUTtnQkFHZixJQUFJLENBQUNNLGlCQUFpQjtvQkFDcEIsTUFBTSxJQUFJSixNQUFNO2dCQUNsQjtnQkFFQSxzREFBc0Q7Z0JBQ3RELE1BQU1iLCtDQUFNQSxDQUFDYyxJQUFJLENBQUNJLE1BQU0sQ0FBQztvQkFDdkJGLE9BQU87d0JBQUVHLElBQUlMLEtBQUtLLEVBQUU7b0JBQUM7b0JBQ3JCQyxNQUFNO3dCQUFFQyxRQUFRO29CQUFTO2dCQUMzQjtnQkFFQSxPQUFPO29CQUNMRixJQUFJTCxLQUFLSyxFQUFFO29CQUNYWCxPQUFPTSxLQUFLTixLQUFLO29CQUNqQmMsV0FBV1IsS0FBS1EsU0FBUztvQkFDekJDLFVBQVVULEtBQUtTLFFBQVE7b0JBQ3ZCQyxPQUFPVixLQUFLVSxLQUFLLElBQUk7Z0JBQ3ZCO1lBQ0Y7UUFDRjtLQUNEO0lBQ0RDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRWIsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JhLE1BQU1SLEVBQUUsR0FBR0wsS0FBS0ssRUFBRTtnQkFDbEJRLE1BQU1MLFNBQVMsR0FBR1IsS0FBS1EsU0FBUztnQkFDaENLLE1BQU1KLFFBQVEsR0FBR1QsS0FBS1MsUUFBUTtnQkFDOUJJLE1BQU1ILEtBQUssR0FBR1YsS0FBS1UsS0FBSztZQUMxQjtZQUNBLE9BQU9HO1FBQ1Q7UUFDQSxNQUFNQyxTQUFRLEVBQUVBLE9BQU8sRUFBRUQsS0FBSyxFQUFFO1lBQzlCLElBQUlBLE9BQU87Z0JBQ1RDLFFBQVFkLElBQUksQ0FBQ0ssRUFBRSxHQUFHUSxNQUFNUixFQUFFO2dCQUMxQlMsUUFBUWQsSUFBSSxDQUFDUSxTQUFTLEdBQUdLLE1BQU1MLFNBQVM7Z0JBQ3hDTSxRQUFRZCxJQUFJLENBQUNTLFFBQVEsR0FBR0ksTUFBTUosUUFBUTtnQkFDdENLLFFBQVFkLElBQUksQ0FBQ1UsS0FBSyxHQUFHRyxNQUFNSCxLQUFLO1lBQ2xDO1lBQ0EsT0FBT0k7UUFDVDtJQUNGO0lBQ0FDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FDLE9BQU9DLGtCQUF5QjtJQUNoQ0osU0FBUztRQUNQSyxVQUFVO0lBQ1o7SUFDQUMsUUFBUUYsUUFBUUcsR0FBRyxDQUFDQyxlQUFlO0FBQ3JDLEVBQUM7QUFFRCxNQUFNQyxVQUFVcEMsMERBQVFBLENBQUNFO0FBRWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbm9uc3RvcC1jaGF0LW5leHQvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz9jOGE0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUFkYXB0ZXIgfSBmcm9tIFwiQG5leHQtYXV0aC9wcmlzbWEtYWRhcHRlclwiXHJcbmltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIlxyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiXHJcbmltcG9ydCB7IGNvbXBhcmUgfSBmcm9tIFwiYmNyeXB0anNcIlxyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCJcclxuaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGgvbmV4dFwiXHJcblxyXG4vLyBGb3JjZXIgbGUgcmVuZHUgZHluYW1pcXVlIHBvdXIgY2V0dGUgcm91dGVcclxuZXhwb3J0IGNvbnN0IGR5bmFtaWMgPSAnZm9yY2UtZHluYW1pYydcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xyXG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICBuYW1lOiBcImNyZWRlbnRpYWxzXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH1cclxuICAgICAgfSxcclxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW1haWwgZXQgbW90IGRlIHBhc3NlIHJlcXVpc1wiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgaWYgKCF1c2VyIHx8ICF1c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFbWFpbCBvdSBtb3QgZGUgcGFzc2UgaW5jb3JyZWN0XCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBhd2FpdCBjb21wYXJlKFxyXG4gICAgICAgICAgY3JlZGVudGlhbHMucGFzc3dvcmQsXHJcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkXHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICBpZiAoIWlzUGFzc3dvcmRWYWxpZCkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRW1haWwgb3UgbW90IGRlIHBhc3NlIGluY29ycmVjdFwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGUgc3RhdHV0IGRlIGwndXRpbGlzYXRldXIgw6AgXCJvbmxpbmVcIlxyXG4gICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XHJcbiAgICAgICAgICB3aGVyZTogeyBpZDogdXNlci5pZCB9LFxyXG4gICAgICAgICAgZGF0YTogeyBzdGF0dXM6IFwib25saW5lXCIgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBpZDogdXNlci5pZCxcclxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgZmlyc3ROYW1lOiB1c2VyLmZpcnN0TmFtZSxcclxuICAgICAgICAgIGxhc3ROYW1lOiB1c2VyLmxhc3ROYW1lLFxyXG4gICAgICAgICAgaW1hZ2U6IHVzZXIuaW1hZ2UgfHwgXCJcIlxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICBdLFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZFxyXG4gICAgICAgIHRva2VuLmZpcnN0TmFtZSA9IHVzZXIuZmlyc3ROYW1lXHJcbiAgICAgICAgdG9rZW4ubGFzdE5hbWUgPSB1c2VyLmxhc3ROYW1lXHJcbiAgICAgICAgdG9rZW4uaW1hZ2UgPSB1c2VyLmltYWdlXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRva2VuXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgaWYgKHRva2VuKSB7XHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nXHJcbiAgICAgICAgc2Vzc2lvbi51c2VyLmZpcnN0TmFtZSA9IHRva2VuLmZpcnN0TmFtZSBhcyBzdHJpbmdcclxuICAgICAgICBzZXNzaW9uLnVzZXIubGFzdE5hbWUgPSB0b2tlbi5sYXN0TmFtZSBhcyBzdHJpbmdcclxuICAgICAgICBzZXNzaW9uLnVzZXIuaW1hZ2UgPSB0b2tlbi5pbWFnZSBhcyBzdHJpbmdcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvblxyXG4gICAgfVxyXG4gIH0sXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogXCIvbG9naW5cIixcclxuICB9LFxyXG4gIGRlYnVnOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiLFxyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxyXG4gIH0sXHJcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQsXHJcbn1cclxuXHJcbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucylcclxuXHJcbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfVxyXG4iXSwibmFtZXMiOlsiUHJpc21hQWRhcHRlciIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJjb21wYXJlIiwicHJpc21hIiwiTmV4dEF1dGgiLCJkeW5hbWljIiwiYXV0aE9wdGlvbnMiLCJhZGFwdGVyIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsIkVycm9yIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlzUGFzc3dvcmRWYWxpZCIsInVwZGF0ZSIsImlkIiwiZGF0YSIsInN0YXR1cyIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwiaW1hZ2UiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlc3Npb24iLCJwYWdlcyIsInNpZ25JbiIsImRlYnVnIiwicHJvY2VzcyIsInN0cmF0ZWd5Iiwic2VjcmV0IiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/messages/last/route.ts":
/*!****************************************!*\
  !*** ./app/api/messages/last/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _auth_nextauth_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../auth/[...nextauth]/route */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// Forcer le rendu dynamique pour cette route\nconst dynamic = \"force-dynamic\";\nasync function GET(request) {\n    try {\n        // Vérifier l'authentification\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Non autoris\\xe9\"\n            }, {\n                status: 401\n            });\n        }\n        const currentUserId = session.user.id;\n        // Récupérer tous les utilisateurs avec qui l'utilisateur courant a échangé des messages\n        const conversations = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.$queryRaw`\n      WITH user_conversations AS (\n        SELECT DISTINCT\n          CASE\n            WHEN sender_id = ${currentUserId} THEN recipient_id\n            ELSE sender_id\n          END as user_id\n        FROM messages\n        WHERE sender_id = ${currentUserId} OR recipient_id = ${currentUserId}\n      )\n      SELECT \n        u.id,\n        (\n          SELECT m.content\n          FROM messages m\n          WHERE (m.sender_id = u.id AND m.recipient_id = ${currentUserId})\n             OR (m.sender_id = ${currentUserId} AND m.recipient_id = u.id)\n          ORDER BY m.created_at DESC\n          LIMIT 1\n        ) as last_message,\n        (\n          SELECT m.created_at\n          FROM messages m\n          WHERE (m.sender_id = u.id AND m.recipient_id = ${currentUserId})\n             OR (m.sender_id = ${currentUserId} AND m.recipient_id = u.id)\n          ORDER BY m.created_at DESC\n          LIMIT 1\n        ) as message_date,\n        (\n          SELECT m.sender_id\n          FROM messages m\n          WHERE (m.sender_id = u.id AND m.recipient_id = ${currentUserId})\n             OR (m.sender_id = ${currentUserId} AND m.recipient_id = u.id)\n          ORDER BY m.created_at DESC\n          LIMIT 1\n        ) as sender_id,\n        (\n          SELECT m.is_read\n          FROM messages m\n          WHERE (m.sender_id = u.id AND m.recipient_id = ${currentUserId})\n             OR (m.sender_id = ${currentUserId} AND m.recipient_id = u.id)\n          ORDER BY m.created_at DESC\n          LIMIT 1\n        ) as is_read\n      FROM users u\n      WHERE u.id IN (SELECT user_id FROM user_conversations)\n    `;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            lastMessages: conversations\n        });\n    } catch (error) {\n        console.error(\"Erreur lors de la r\\xe9cup\\xe9ration des derniers messages:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erreur serveur\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL21lc3NhZ2VzL2xhc3Qvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUF1RDtBQUNsQjtBQUNPO0FBQ2dCO0FBRTVELDZDQUE2QztBQUN0QyxNQUFNSSxVQUFVLGdCQUFlO0FBRS9CLGVBQWVDLElBQUlDLE9BQW9CO0lBQzVDLElBQUk7UUFDRiw4QkFBOEI7UUFDOUIsTUFBTUMsVUFBVSxNQUFNTCwyREFBZ0JBLENBQUNDLDZEQUFXQTtRQUVsRCxJQUFJLENBQUNJLFNBQVNDLE1BQU1DLElBQUk7WUFDdEIsT0FBT1QscURBQVlBLENBQUNVLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFlLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNwRTtRQUVBLE1BQU1DLGdCQUFnQk4sUUFBUUMsSUFBSSxDQUFDQyxFQUFFO1FBRXJDLHdGQUF3RjtRQUN4RixNQUFNSyxnQkFBZ0IsTUFBTWIsK0NBQU1BLENBQUNjLFNBQVMsQ0FBQzs7Ozs2QkFJcEIsRUFBRUYsY0FBYzs7OzswQkFJbkIsRUFBRUEsY0FBYyxtQkFBbUIsRUFBRUEsY0FBYzs7Ozs7Ozt5REFPcEIsRUFBRUEsY0FBYzsrQkFDMUMsRUFBRUEsY0FBYzs7Ozs7Ozt5REFPVSxFQUFFQSxjQUFjOytCQUMxQyxFQUFFQSxjQUFjOzs7Ozs7O3lEQU9VLEVBQUVBLGNBQWM7K0JBQzFDLEVBQUVBLGNBQWM7Ozs7Ozs7eURBT1UsRUFBRUEsY0FBYzsrQkFDMUMsRUFBRUEsY0FBYzs7Ozs7O0lBTTNDLENBQUM7UUFFRCxPQUFPYixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVNLGNBQWNGO1FBQWM7SUFDekQsRUFBRSxPQUFPSCxPQUFPO1FBQ2RNLFFBQVFOLEtBQUssQ0FBQywrREFBeURBO1FBQ3ZFLE9BQU9YLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFpQixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUN0RTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbm9uc3RvcC1jaGF0LW5leHQvLi9hcHAvYXBpL21lc3NhZ2VzL2xhc3Qvcm91dGUudHM/OWEwMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIlxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGhcIlxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcblxuLy8gRm9yY2VyIGxlIHJlbmR1IGR5bmFtaXF1ZSBwb3VyIGNldHRlIHJvdXRlXG5leHBvcnQgY29uc3QgZHluYW1pYyA9ICdmb3JjZS1keW5hbWljJ1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgLy8gVsOpcmlmaWVyIGwnYXV0aGVudGlmaWNhdGlvblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuICAgIFxuICAgIGlmICghc2Vzc2lvbj8udXNlcj8uaWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnTm9uIGF1dG9yaXPDqScgfSwgeyBzdGF0dXM6IDQwMSB9KVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBjdXJyZW50VXNlcklkID0gc2Vzc2lvbi51c2VyLmlkXG4gICAgXG4gICAgLy8gUsOpY3Vww6lyZXIgdG91cyBsZXMgdXRpbGlzYXRldXJzIGF2ZWMgcXVpIGwndXRpbGlzYXRldXIgY291cmFudCBhIMOpY2hhbmfDqSBkZXMgbWVzc2FnZXNcbiAgICBjb25zdCBjb252ZXJzYXRpb25zID0gYXdhaXQgcHJpc21hLiRxdWVyeVJhd2BcbiAgICAgIFdJVEggdXNlcl9jb252ZXJzYXRpb25zIEFTIChcbiAgICAgICAgU0VMRUNUIERJU1RJTkNUXG4gICAgICAgICAgQ0FTRVxuICAgICAgICAgICAgV0hFTiBzZW5kZXJfaWQgPSAke2N1cnJlbnRVc2VySWR9IFRIRU4gcmVjaXBpZW50X2lkXG4gICAgICAgICAgICBFTFNFIHNlbmRlcl9pZFxuICAgICAgICAgIEVORCBhcyB1c2VyX2lkXG4gICAgICAgIEZST00gbWVzc2FnZXNcbiAgICAgICAgV0hFUkUgc2VuZGVyX2lkID0gJHtjdXJyZW50VXNlcklkfSBPUiByZWNpcGllbnRfaWQgPSAke2N1cnJlbnRVc2VySWR9XG4gICAgICApXG4gICAgICBTRUxFQ1QgXG4gICAgICAgIHUuaWQsXG4gICAgICAgIChcbiAgICAgICAgICBTRUxFQ1QgbS5jb250ZW50XG4gICAgICAgICAgRlJPTSBtZXNzYWdlcyBtXG4gICAgICAgICAgV0hFUkUgKG0uc2VuZGVyX2lkID0gdS5pZCBBTkQgbS5yZWNpcGllbnRfaWQgPSAke2N1cnJlbnRVc2VySWR9KVxuICAgICAgICAgICAgIE9SIChtLnNlbmRlcl9pZCA9ICR7Y3VycmVudFVzZXJJZH0gQU5EIG0ucmVjaXBpZW50X2lkID0gdS5pZClcbiAgICAgICAgICBPUkRFUiBCWSBtLmNyZWF0ZWRfYXQgREVTQ1xuICAgICAgICAgIExJTUlUIDFcbiAgICAgICAgKSBhcyBsYXN0X21lc3NhZ2UsXG4gICAgICAgIChcbiAgICAgICAgICBTRUxFQ1QgbS5jcmVhdGVkX2F0XG4gICAgICAgICAgRlJPTSBtZXNzYWdlcyBtXG4gICAgICAgICAgV0hFUkUgKG0uc2VuZGVyX2lkID0gdS5pZCBBTkQgbS5yZWNpcGllbnRfaWQgPSAke2N1cnJlbnRVc2VySWR9KVxuICAgICAgICAgICAgIE9SIChtLnNlbmRlcl9pZCA9ICR7Y3VycmVudFVzZXJJZH0gQU5EIG0ucmVjaXBpZW50X2lkID0gdS5pZClcbiAgICAgICAgICBPUkRFUiBCWSBtLmNyZWF0ZWRfYXQgREVTQ1xuICAgICAgICAgIExJTUlUIDFcbiAgICAgICAgKSBhcyBtZXNzYWdlX2RhdGUsXG4gICAgICAgIChcbiAgICAgICAgICBTRUxFQ1QgbS5zZW5kZXJfaWRcbiAgICAgICAgICBGUk9NIG1lc3NhZ2VzIG1cbiAgICAgICAgICBXSEVSRSAobS5zZW5kZXJfaWQgPSB1LmlkIEFORCBtLnJlY2lwaWVudF9pZCA9ICR7Y3VycmVudFVzZXJJZH0pXG4gICAgICAgICAgICAgT1IgKG0uc2VuZGVyX2lkID0gJHtjdXJyZW50VXNlcklkfSBBTkQgbS5yZWNpcGllbnRfaWQgPSB1LmlkKVxuICAgICAgICAgIE9SREVSIEJZIG0uY3JlYXRlZF9hdCBERVNDXG4gICAgICAgICAgTElNSVQgMVxuICAgICAgICApIGFzIHNlbmRlcl9pZCxcbiAgICAgICAgKFxuICAgICAgICAgIFNFTEVDVCBtLmlzX3JlYWRcbiAgICAgICAgICBGUk9NIG1lc3NhZ2VzIG1cbiAgICAgICAgICBXSEVSRSAobS5zZW5kZXJfaWQgPSB1LmlkIEFORCBtLnJlY2lwaWVudF9pZCA9ICR7Y3VycmVudFVzZXJJZH0pXG4gICAgICAgICAgICAgT1IgKG0uc2VuZGVyX2lkID0gJHtjdXJyZW50VXNlcklkfSBBTkQgbS5yZWNpcGllbnRfaWQgPSB1LmlkKVxuICAgICAgICAgIE9SREVSIEJZIG0uY3JlYXRlZF9hdCBERVNDXG4gICAgICAgICAgTElNSVQgMVxuICAgICAgICApIGFzIGlzX3JlYWRcbiAgICAgIEZST00gdXNlcnMgdVxuICAgICAgV0hFUkUgdS5pZCBJTiAoU0VMRUNUIHVzZXJfaWQgRlJPTSB1c2VyX2NvbnZlcnNhdGlvbnMpXG4gICAgYFxuICAgIFxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGxhc3RNZXNzYWdlczogY29udmVyc2F0aW9ucyB9KVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBsb3JzIGRlIGxhIHLDqWN1cMOpcmF0aW9uIGRlcyBkZXJuaWVycyBtZXNzYWdlczonLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0VycmV1ciBzZXJ2ZXVyJyB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJwcmlzbWEiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJkeW5hbWljIiwiR0VUIiwicmVxdWVzdCIsInNlc3Npb24iLCJ1c2VyIiwiaWQiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJjdXJyZW50VXNlcklkIiwiY29udmVyc2F0aW9ucyIsIiRxdWVyeVJhdyIsImxhc3RNZXNzYWdlcyIsImNvbnNvbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/messages/last/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = global;\nconst prisma = globalForPrisma.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7S0FBUTtBQUNoQixHQUFFO0FBRUosSUFBSUMsSUFBeUIsRUFBY0osZ0JBQWdCRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbm9uc3RvcC1jaGF0LW5leHQvLi9saWIvcHJpc21hLnRzPzk4MjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXHJcblxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWwgYXMgdW5rbm93biBhcyB7IHByaXNtYTogUHJpc21hQ2xpZW50IH1cclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgfHxcclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogWydxdWVyeSddLFxyXG4gIH0pXHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYVxyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fmessages%2Flast%2Froute&page=%2Fapi%2Fmessages%2Flast%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fmessages%2Flast%2Froute.ts&appDir=C%3A%5CUsers%5CVICTUS%5CDocuments%5CGitHub%5Cnon_stop_chat%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CVICTUS%5CDocuments%5CGitHub%5Cnon_stop_chat&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();