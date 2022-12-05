<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    class="text-gray-900 antialiased leading-tight">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ env('APP_NAME') }}</title>
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
        @vite('resources/js/app.ts')
    </head>
    <body class="min-h-screen bg-gray-100">
        <div id="app" class="min-h-screen">
            <App/>
        </div>
    </body>
</html>