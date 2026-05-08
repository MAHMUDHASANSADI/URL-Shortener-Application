<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Repositories\Interfaces\UrlRepositoryInterface;

class UrlController extends Controller
{
    protected $urlRepo;

    public function __construct(UrlRepositoryInterface $urlRepo)
    {
        $this->middleware('auth');
        $this->urlRepo = $urlRepo;
    }

    public function index()
    {
        $urls = $this->urlRepo->getByUser(auth()->id());

        return Inertia::render('Dashboard', [
            'urls' => $urls
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'original_url' => 'required|url'
        ]);

        // Generate unique short code
        do {
            $code = Str::random(6);
        } while ($this->urlRepo->findByShortCode($code));

        $this->urlRepo->create([
            'user_id' => auth()->id(),
            'original_url' => $request->original_url,
            'short_code' => $code
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'original_url' => 'required|url'
        ]);

        $this->urlRepo->update($id, [
            'original_url' => $request->original_url
        ]);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $this->urlRepo->delete($id);
        return redirect()->back();
    }
}
