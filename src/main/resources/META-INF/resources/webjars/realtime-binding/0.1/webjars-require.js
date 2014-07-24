/*global requirejs */

// Ensure any request for this webjar brings in jQuery.
requirejs.config({
    paths: { "realtime-binding": webjars.path("realtime-binding", "realtime-binding") },
    shim: { "realtime-binding": { "exports": "SocketBinder" } }
});