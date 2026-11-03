<?php

// Login for the management pages (/projects). Values come from .env so the
// password is never written in the code or pushed to GitHub.
return [
    'email'    => env('ADMIN_EMAIL'),
    'password' => env('ADMIN_PASSWORD'),
];
