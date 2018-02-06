<h1>{{ post.post.title}}</h1>
<p ng-if="post.post.attachement[0].url"><img src="{{ post.attachement[0].url }}"></p>

<p>
	{{ post.post.date }}
	in
	<a href="#/blog/{{ post.post.categories[0].slug }}">post.post.categories[0].title</a>
</p>

<div ng-bind-html="post.post.content"></div>

<p><a href="#/blog">back to blog</a></p>