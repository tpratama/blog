Preliminary
-----------

Welcome to my blog! I'm very glad that you can arrived at this blog. Currently my blog is still under development.
I'm making this with `React` and I created my own CMS ! I hope i can finish this CMS in 3 months.

Working Feature
---------------

Currently working feature are created content without admin panel :p because i don't have time to make the admin panel,
the admin panel basically the localhost page that used to create and manage posts.

To make this post appear to your browser, i must create my own markdown file and a config file. The config itself contain :
```
{
    "title": "Welcome to My Blog",
    "section": "CMS",
    "content": "./source/welcome.md",
    "categories": ["Others"]
}
```
And I have magic file to generate all the configs... This magic file will read all your json config, group by category, group by timestamp, and etc.
So in the future we can filter posts by category or filter post by timestamp. If I want to add some content, I can create it under `content` directory.
You can view this page repo to know how this works (currently this cms is so sucks lol :v). And last, the section is dynamically for paging in the future :p just wait till it implemented.

Thank you, I will update as I continue my development!
