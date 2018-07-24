/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */
/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
     */
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
        it('allFeeds\'s urls are not null', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
                expect(feed.url.length).not.toBe(0);
            });

        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */

        it('allFeeds\'s names are not null', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
                expect(feed.name.length).not.toBe(0);

            });
        });

    });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */
    describe('The menu', function() {
        /* TODO:
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         */
        it('is hidden', function() {
            expect($('body')[0].className).toBe('menu-hidden');
        });


        /* TODO:
         * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
         * 测试应该包含两个 expectation ： 当点击图标的时候菜单是否显示，
         * 再次点击的时候是否隐藏。
         */

        it('could be hidden or visibile', function() {
            let menuIcon = $('.menu-icon-link');

            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();

        });


    });



    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */

    describe('Initial Entries', function() {

        /* TODO:
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */


        beforeEach(function(done) {

            loadFeed(0, done);

        }, 10000);


        it('even have one entry element', function(done) {
            let feed = $('.feed');
            expect(feed[0].hasChildNodes('a.entry-link')).toBeTruthy();
            done();
        });

    });

    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */

    describe('New Feed Selection', function() {
        /* TODO:
         * 写一个测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         * 记住，loadFeed() 函数是异步的。
         */

        //通过random产生随机数，（第一次）随机测试加载某个feed
        let ran = Math.random();
        let urlIndex = 0;
        let firstTitle,secondTitle;
        let firstFeed,secondFeed;
        //（第二次）固定测试加载allFeeds中的最后一个feed
        let index = allFeeds.length - 1;

        beforeEach(function(done) {
            urlIndex = Math.floor(index * ran);
            loadFeed(urlIndex, function() {
                firstTitle = $('.header-title').first().text();
                firstFeed = $('.feed').first().html();
                loadFeed(index, function() {
                    secondTitle = $('.header-title').first().text();
                    secondFeed = $('.feed').first().html();
                    done();
                });

            });

        }, 10000);

        //测试结束后，页面刷新为第一个feed
        afterEach(function() {
            setTimeout(function() {
                loadFeed(0);

            }, 15000);
        }, 20000);

        it('could be change correctly', function(done) {
            // console.log(secondFeed);
            //确保两次加载的页面主标题和内容均不同
            expect(firstTitle).not.toBe(secondTitle);
            expect(firstFeed).not.toBe(secondFeed);
            // 第一次加载的页面标题使用随机的index，应该和allFeeds中相同的index下页面主标题一致
            expect(firstTitle).toBe(allFeeds[urlIndex].name);
            done();
        }, 5000);


    });


}());