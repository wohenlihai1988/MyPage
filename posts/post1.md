	
{{{ "title" : "写给朋友的Unity入门教程2",
	"subTitle" : "实用至上",
	"author": "刘欢",
	"date": "2017.3.1",
	"p1" : "前面讲了Unity 代码的组织方式，但是组件化会导致一个问题就是很难找到入口，组件化之前的执行顺序也会成为问题。",
	"p2" : "如果在Unity中新建一个脚本，会默认生成一个和文件同名的类，并继承自Monobehaviour，并且有两个空的函数，Start 和 Update， 所有继承自MonoBehaviour的类，都会接受Unity的管理，但是前提是要挂到Gameobject上，前面说了Gameobject是容器，我们的文件是叶子节点。如果挂不上去，有可能是类名和文件名不符，请检查一下。并且这种类运行时是不能使用New 操作符的，而是要通过Addcomponent方法，来代替拖拽操作",
	"p3" : "一旦代码挂在Gameobject上，在运行时Unity就会自动调用代码，大概是通过反射的方式，Unity会记录每个Component中的关键方法，通过函数名，比如 Awake Start Update LateUpdate FixedUpdate 等等等等，有很多。因此有时候你发现一个类里面有个方法，根本就找不到调用的地方，运行时却会被执行到，很有可能就是Unity的关键方法，或者是通过SendMessage的方式被调用了。",
	"p4" : "先放下SendMessage不谈，Unity中最基础的几个关键方法，是需要记住的，也是最常用的，就是Awake Start Update FixedUpdate ，几乎所有的程序都会用到",
	"p5" : "Awake的调用时机，为所在的Gameobject实例化的时候，你可以理解为构造函数，虽然完全不一样，但是我觉得这样更好理解。而Update 会在每一帧渲染之前调用，由于双缓存机制，也可以说在每一帧渲染之后，Update会附带一个参数，这个参数就是每帧的间隔，所以要注意，Update是和帧数密切相关的。帧数浮动的话Update的调用间隔也会不一样，相对的就是FixedUpdate，他的间隔可以在ProejectSetting -> Time 设置中进行设置，固定时间，和渲染的执行无关，可以理解为和渲染是两个线程，互不相关，而Update插在渲染线程中，需要等待渲染完成。而Start 最方便的理解就是第一次Update 的替代， Awake是构造方法，所以在Awake之后，而在Update之前。当同时初始化很多歌对象的时候，就可以通过Awake和Start来控制执行顺序，在Awake中做基础数据的初始化，在Start中进行使用时，可以保证初始化已经完成。",
	"p6" : "但是每个Awake和Start 是并行关系，不能保证先后顺序，我没测试，感觉Awake可能和实例化的顺序有关，有空测试一下，看下结果。如果想要控制先后顺序，有个方式是在ProjectSetting->Script Execution Order 中进行修改，但是我个人不是很建议，最好在设计上来控制，需要控制顺序的方法，自己建立依赖关系比较好."
}}}