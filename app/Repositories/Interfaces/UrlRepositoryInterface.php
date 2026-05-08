<?php

namespace App\Repositories\Interfaces;

interface UrlRepositoryInterface
{
    public function create(array $data);
    public function getByUser($userId);
    public function findByShortCode($code);
    public function update($id, array $data);
    public function delete($id);
}
