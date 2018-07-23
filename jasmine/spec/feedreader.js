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
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
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
            console.log($('body')[0].className.length);
            expect($('body')[0].className).toBe('menu-hidden');
        });


         /* TODO:
          * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
          * 测试应该包含两个 expectation ： 当点击图标的时候菜单是否显示，
          * 再次点击的时候是否隐藏。
          */

          // 为什么我在写这个的时候想要进行异步测试，或者说想要增加一个监听事件，在
          // 监听函数中执行expect，然后就报错了
        it('could be hidden or visibile', function() {
            let menuIcon = $('.menu-icon-link');

            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();

        });

        // afterEach(function() {
        //     if(count%2===1) {
        //         expect(a1).toBe(0);
        //     }
        // });


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


        // beforeEach(function(done) {
        //     setTimeout(function() {
        //         loadFeed(0,done);
        //     },1000);

        // });


        beforeEach(function(done) {
            // setTimeout(function() {
                loadFeed(0,done);
            // },1000);

        },10000);


        it('even have one entry element', function(done) {
            let feed = $('.feed');
            console.log($('.feed .entry-link'));
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
        let urlIndex = 0;
            let ran = Math.random();
            let firstLoad= 0;
            let secondLoad = 0;
            let index = allFeeds.length - 1;
        beforeEach(function(done) { 
            urlIndex = Math.floor(index*ran);
            loadFeed(index,function() {
                firstLoad = $('header-title').first().text();
                loadFeed(urlIndex, function() {
                    secondLoad = $('header-title').first().text();
                    done();
                });
                done();
            });

        }, 5000);

        afterEach(function() {
            jasmine.clock().uninstall();
            setTimeout(function() {
                loadFeed(0);
                
            },7000);
        },8000);

        it('could be change correctly', function(done) {
            console.log(urlIndex);
            expect(firstLoad).not.toBe(secondLoad);
            done();
        },1000);

        
    });


}());
