from django.test import TestCase
from django.contrib.auth.models import User
from .models import Post

class PostModelTest(TestCase):
    def setUp(self):
        user = User.objects.create_user(username='testuser', password='password')
        Post.objects.create(title='Test Post', content='Content for test post', author=user)

    def test_post_content(self):
        post = Post.objects.get(id=1)
        expected_object_name = f'{post.title}'
        self.assertEqual(expected_object_name, 'Test Post')
