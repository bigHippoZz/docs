// /**
//  *
//  *
//  * 其实就是参数可以接受比其定义的类型更宽广的类型，而返回值可以接受比其定义的类型更狭窄的类型。这里狭窄和宽广意思就是比限定的属性多还是少。比如我们做组件库时，参数会限定个比各种可能都宽广的类型，最宽广的类型自然是any了。而函数的返回值则会比限定更狭窄类型，返回值情况用的较少，一般都是明确返回值类型与其相等。
//  */

// class Animal_ {}

// class Cat extends Animal_ {
//     meow() {
//         console.log("cat meow");
//     }
// }
// class Dog extends Animal_ {
//     wow() {
//         console.log("dog wow");
//     }
// }
// class SmallDog extends Dog {
//     public name: string = "yehuozhili";
// }
// //参数dog，返回值Dog
// type testType = (v: Dog) => Dog;

// function exec(v: testType) {
//     v(new SmallDog());
// }

// //试验：
// type childToChild = (v: SmallDog) => SmallDog;
// let aaaa: childToChild = v => new SmallDog();

// exec(aaaa);

// type childToParent = (v: SmallDog) => Animal_;
// let aaaa2: childToParent = v => new Animal_();

// exec(aaaa2);

// type parentToChild = (v: Animal_) => SmallDog;
// let aaaa3: parentToChild = v => new SmallDog();
// exec(aaaa3); //不报错

// type parentToParent = (v: Animal_) => Animal_;
// let aaaa4: parentToParent = v => new Animal_();
// exec(aaaa4);

// interface SuperType {
//     base: string;
// }
// interface SubType extends SuperType {
//     addition: string;
// }

// // subtype compatibility
// let superType: SuperType = { base: "base" };
// let subType: SubType = { base: "myBase", addition: "myAddition" };
// superType = subType;

// // Covariant
// type Covariant<T> = T[];
// let coSuperType: Covariant<SuperType> = [];
// let coSubType: Covariant<SubType> = [];
// coSuperType = coSubType;
