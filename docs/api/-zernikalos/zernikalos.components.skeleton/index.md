---
slug: "index"
---
# components.skeleton
<div class="main-content" data-page-type="package" id="content" pageids="Zernikalos::zernikalos.components.skeleton////PointingToDeclaration//1558683979">


<div class="tabbedcontent">
<div class="tabs-section" tabs-section="tabs-section"><button class="section-tab" data-active="" data-togglable="TYPE">Types</button></div>
<div class="tabs-section-body">
<div data-togglable="TYPE">
<h2 class="">Types</h2>
<div class="table"><a anchor-label="ZBone" data-filterable-set=":/commonMain" data-name="1355272627%2FClasslikes%2F1558683979" id="1355272627%2FClasslikes%2F1558683979"></a>
<div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-bone/index"><span><span>ZBone</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="1355272627%2FClasslikes%2F1558683979"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted" data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><div class="block"><div class="block"><span class="token annotation builtin">@</span><span data-unresolved-link="kotlinx.serialization/Serializable///PointingToDeclaration/"><span class="token annotation builtin">Serializable</span></span><span class="token punctuation">(</span><span>with<span class="token operator"> = </span><a href="-z-bone-serializer/index">ZBoneSerializer::class</a></span><wbr/><span class="token punctuation">)</span></div></div><span class="token keyword">class </span><a href="-z-bone/index">ZBone</a> : <a href="../zernikalos.components/-z-serializable-component/index">ZSerializableComponent</a><span class="token operator">&lt;</span><a href="-z-bone-data/index">ZBoneData</a><span class="token operator">&gt; </span>, <a href="../zernikalos.search/-z-tree-node/index">ZTreeNode</a><span class="token operator">&lt;</span><a href="-z-bone/index">ZBone</a><span class="token operator">&gt; </span></div></div></div>
</div>
</div>
</div>
</div>
<a anchor-label="ZBoneData" data-filterable-set=":/commonMain" data-name="1262146601%2FClasslikes%2F1558683979" id="1262146601%2FClasslikes%2F1558683979"></a>
<div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-bone-data/index"><span>ZBone</span><wbr/><span><span>Data</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="1262146601%2FClasslikes%2F1558683979"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted" data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><div class="block"><div class="block"><span class="token annotation builtin">@</span><span data-unresolved-link="kotlinx.serialization/Serializable///PointingToDeclaration/"><span class="token annotation builtin">Serializable</span></span></div></div><span class="token keyword">data </span><span class="token keyword">class </span><a href="-z-bone-data/index">ZBoneData</a><span class="token punctuation">(</span><span class="parameters"><span class="parameter"><span class="token keyword">var </span>id<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/index">String</a><span class="token operator"> = </span><span class="token string">""</span><span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>name<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/index">String</a><span class="token operator"> = </span><span class="token string">""</span><span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>idx<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-int/index">Int</a><span class="token operator"> = </span>-1<span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>transform<span class="token operator">: </span><a href="../zernikalos.math/-z-transform/index">ZTransform</a><span class="token operator"> = </span>ZTransform()<span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">val </span>children<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin.collections/-array-list/index">ArrayList</a><span class="token operator">&lt;</span><a href="-z-bone/index">ZBone</a><span class="token operator">&gt;</span><span class="token operator"> = </span>arrayListOf()<span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>inverseBindTransform<span class="token operator">: </span><a href="../zernikalos.math/-z-transform/index">ZTransform</a><span class="token operator">?</span><span class="token operator"> = </span>ZTransform()</span></span><span class="token punctuation">)</span> : <a href="../zernikalos.components/-z-component-data/index">ZComponentData</a></div></div></div>
</div>
</div>
</div>
</div>
<a anchor-label="ZBoneSerializer" data-filterable-set=":/commonMain" data-name="1416131009%2FClasslikes%2F1558683979" id="1416131009%2FClasslikes%2F1558683979"></a>
<div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-bone-serializer/index"><span>ZBone</span><wbr/><span><span>Serializer</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="1416131009%2FClasslikes%2F1558683979"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted" data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><span class="token keyword">class </span><a href="-z-bone-serializer/index">ZBoneSerializer</a> : <a href="../zernikalos.components/-z-component-serializer/index">ZComponentSerializer</a><span class="token operator">&lt;</span><a href="-z-bone/index">ZBone</a><span class="token punctuation">, </span><a href="-z-bone-data/index">ZBoneData</a><span class="token operator">&gt; </span></div></div></div>
</div>
</div>
</div>
</div>
<a anchor-label="ZSkeleton" data-filterable-set=":/commonMain" data-name="-90514102%2FClasslikes%2F1558683979" id="-90514102%2FClasslikes%2F1558683979"></a>
<div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-skeleton/index"><span><span>ZSkeleton</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="-90514102%2FClasslikes%2F1558683979"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted" data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><span class="token keyword">class </span><a href="-z-skeleton/index">ZSkeleton</a> : <a href="../zernikalos.components/-z-serializable-component/index">ZSerializableComponent</a><span class="token operator">&lt;</span><a href="-z-skeleton-data/index">ZSkeletonData</a><span class="token operator">&gt; </span></div></div></div>
</div>
</div>
</div>
</div>
<a anchor-label="ZSkeletonData" data-filterable-set=":/commonMain" data-name="1994406976%2FClasslikes%2F1558683979" id="1994406976%2FClasslikes%2F1558683979"></a>
<div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-skeleton-data/index"><span>ZSkeleton</span><wbr/><span><span>Data</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="1994406976%2FClasslikes%2F1558683979"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted" data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><div class="block"><div class="block"><span class="token annotation builtin">@</span><span data-unresolved-link="kotlinx.serialization/Serializable///PointingToDeclaration/"><span class="token annotation builtin">Serializable</span></span></div></div><span class="token keyword">data </span><span class="token keyword">class </span><a href="-z-skeleton-data/index">ZSkeletonData</a><span class="token punctuation">(</span><span class="parameters"><span class="parameter"><span class="token keyword">var </span>root<span class="token operator">: </span><a href="-z-bone/index">ZBone</a><span class="token operator"> = </span>ZBone()</span></span><span class="token punctuation">)</span> : <a href="../zernikalos.components/-z-component-data/index">ZComponentData</a></div></div></div>
</div>
</div>
</div>
</div>
<a anchor-label="ZSkeletonDataWrapper" data-filterable-set=":/commonMain" data-name="2071792687%2FClasslikes%2F1558683979" id="2071792687%2FClasslikes%2F1558683979"></a>
<div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-skeleton-data-wrapper/index"><span>ZSkeleton</span><wbr/><span>Data</span><wbr/><span><span>Wrapper</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="2071792687%2FClasslikes%2F1558683979"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted" data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><div class="block"><div class="block"><span class="token annotation builtin">@</span><span data-unresolved-link="kotlinx.serialization/Serializable///PointingToDeclaration/"><span class="token annotation builtin">Serializable</span></span></div></div><span class="token keyword">data </span><span class="token keyword">class </span><a href="-z-skeleton-data-wrapper/index">ZSkeletonDataWrapper</a><span class="token punctuation">(</span><span class="parameters"><span class="parameter"><span class="token keyword">var </span>refId<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-int/index">Int</a><span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>isReference<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-boolean/index">Boolean</a><span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>data<span class="token operator">: </span><a href="-z-skeleton-data/index">ZSkeletonData</a><span class="token operator">?</span><span class="token operator"> = </span>null</span></span><span class="token punctuation">)</span> : <a href="../zernikalos.components/-z-ref-component-wrapper/index">ZRefComponentWrapper</a><span class="token operator">&lt;</span><a href="-z-skeleton-data/index">ZSkeletonData</a><span class="token operator">&gt; </span></div></div></div>
</div>
</div>
</div>
</div>
<a anchor-label="ZSkeletonSerializer" data-filterable-set=":/commonMain" data-name="-1190187880%2FClasslikes%2F1558683979" id="-1190187880%2FClasslikes%2F1558683979"></a>
<div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-skeleton-serializer/index"><span>ZSkeleton</span><wbr/><span><span>Serializer</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="-1190187880%2FClasslikes%2F1558683979"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted" data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><span class="token keyword">class </span><a href="-z-skeleton-serializer/index">ZSkeletonSerializer</a><span class="token punctuation">(</span><span class="parameters"><span class="parameter">loaderContext<span class="token operator">: </span><a href="../zernikalos.loader/-z-loader-context/index">ZLoaderContext</a></span></span><span class="token punctuation">)</span> : <a href="../zernikalos.components/-z-ref-component-serializer/index">ZRefComponentSerializer</a><span class="token operator">&lt;</span><a href="-z-skeleton/index">ZSkeleton</a><span class="token punctuation">, </span><a href="-z-skeleton-data/index">ZSkeletonData</a><span class="token punctuation">, </span><a href="-z-skeleton-data-wrapper/index">ZSkeletonDataWrapper</a><span class="token operator">&gt; </span></div></div></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
