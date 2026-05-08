<?php

namespace App\Repositories;

use App\Models\Url;
use App\Repositories\Interfaces\UrlRepositoryInterface;

class UrlRepository implements UrlRepositoryInterface
{
    public function create(array $data)
    {
        return Url::create($data);
    }

    public function getByUser($userId)
    {
        return Url::where('user_id', $userId)->latest()->get();
    }

    public function findByShortCode($code)
    {
        return Url::where('short_code', $code)->first();
    }

    public function update($id, array $data)
    {
        $url = Url::where('user_id', auth()->id())
            ->findOrFail($id);

        $url->update($data);

        return $url;
    }

    public function delete($id)
    {
        $url = Url::where('user_id', auth()->id())
            ->findOrFail($id);

        return $url->delete();
    }
}
