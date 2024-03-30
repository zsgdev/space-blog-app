<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 50; $i++) {
            $user = User::query()->create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => bcrypt('password'), // Для примера используем фиксированный пароль 'password'
            ]);

            for ($j = 0; $j < rand(5, 10); $j++) {
                $category = Category::query()->create([
                    'name' => $faker->word,
                    'user_id' => $user->id,
                ]);

                for ($k = 0; $k < rand(10, 15); $k++) {
                    $post = Post::query()->create([
                        'title' => $faker->sentence,
                        'content' => $faker->paragraph,
                        'user_id' => $user->id,
                        'category_id' => $category->id,
                    ]);

                    for ($l = 0; $l < rand(1, 5); $l++) {
                        $comment = Comment::query()->create([
                            'user_id' => $faker->randomElement([$user->id]),
                            'post_id' => $post->id,
                            'comment' => $faker->sentence,
                        ]);
                    }
                }
            }
        }
    }
}
