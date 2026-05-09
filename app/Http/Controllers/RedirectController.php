<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\UrlRepositoryInterface;

class RedirectController extends Controller
{
    protected $urlRepo;

    public function __construct(UrlRepositoryInterface $urlRepo)
    {
        $this->urlRepo = $urlRepo;
    }

    public function handle($code)
    {
        $url = $this->urlRepo->findByShortCode($code);

        if (!$url) {
            abort(404);
        }

        // Check for expiration
        if ($url->expires_at && $url->expires_at->isPast()) {
            abort(410, 'This link has expired.');
        }

        // Increment clicks
        $this->urlRepo->incrementClicks($url->id);

        return redirect()->to($url->original_url);
    }
}
