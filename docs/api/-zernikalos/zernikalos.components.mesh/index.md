---
slug: "index"
---
# components.mesh
<div class="main-content" data-page-type="package" id="content" pageids="Zernikalos::zernikalos.components.mesh////PointingToDeclaration//32312795">


<div class="tabbedcontent">
<div class="tabs-section" tabs-section="tabs-section"><button class="section-tab" data-active="" data-togglable="TYPE">Types</button><button class="section-tab" data-togglable="FUNCTION,EXTENSION_FUNCTION">Functions</button></div>
<div class="tabs-section-body">
<div data-togglable="TYPE">
<h2 class="">Types</h2>
<div class="table"><a anchor-label="ZBuffer" data-filterable-set=":/commonMain" data-name="-786135145%2FClasslikes%2F1558683979" id="-786135145%2FClasslikes%2F1558683979"></a>
<div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-buffer/index"><span><span>ZBuffer</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="-786135145%2FClasslikes%2F1558683979"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted" data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><span class="token keyword">class </span><a href="-z-buffer/index">ZBuffer</a> : <a href="../zernikalos.components/-z-renderizable-component/index">ZRenderizableComponent</a><span class="token operator">&lt;</span><a href="-z-buffer-data/index">ZBufferData</a><span class="token punctuation">, </span><a href="-z-buffer-renderer/index">ZBufferRenderer</a><span class="token operator">&gt; </span>, <a href="../zernikalos.components/-z-bindeable/index">ZBindeable</a></div><div class="brief"><p class="paragraph">Utility class for representing the mix of a ZBufferKey + ZRawBuffer in a simpler way Notice that ZBufferKey will only address one ZRawBuffer, however one ZRawBuffer can be addressed by more than one ZBufferKey</p></div></div></div>
</div>
</div>
</div>
</div>
<a anchor-label="ZBufferData" data-filterable-set=":/commonMain" data-name="1086453773%2FClasslikes%2F1558683979" id="1086453773%2FClasslikes%2F1558683979"></a>
<div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-buffer-data/index"><span>ZBuffer</span><wbr/><span><span>Data</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="1086453773%2FClasslikes%2F1558683979"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted" data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><span class="token keyword">data </span><span class="token keyword">class </span><a href="-z-buffer-data/index">ZBufferData</a><span class="token punctuation">(</span><span class="parameters"><span class="parameter"><span class="token keyword">var </span>id<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-int/index">Int</a><span class="token operator"> = </span>-1<span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>dataType<span class="token operator">: </span><a href="../zernikalos/-z-data-type/index">ZDataType</a><span class="token operator"> = </span>ZTypes.NONE<span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>name<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/index">String</a><span class="token operator"> = </span><span class="token string">""</span><span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>size<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-int/index">Int</a><span class="token operator"> = </span>-1<span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>count<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-int/index">Int</a><span class="token operator"> = </span>-1<span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>normalized<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-boolean/index">Boolean</a><span class="token operator"> = </span><span class="token boolean">false</span><span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>offset<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-int/index">Int</a><span class="token operator"> = </span>-1<span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>stride<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-int/index">Int</a><span class="token operator"> = </span>-1<span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>isIndexBuffer<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-boolean/index">Boolean</a><span class="token operator"> = </span><span class="token boolean">false</span><span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>bufferId<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-int/index">Int</a><span class="token operator"> = </span>-1<span class="token punctuation">, </span></span><span class="parameter"><span class="token keyword">var </span>dataArray<span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-byte-array/index">ByteArray</a><span class="token operator"> = </span>byteArrayOf()</span></span><span class="token punctuation">)</span> : <a href="../zernikalos.components/-z-component-data/index">ZComponentData</a></div></div></div>
</div>
</div>
</div>
</div>
<a anchor-label="ZBufferRenderer" data-filterable-set=":/commonMain,:/metalMain,:/oglMain" data-name="1721848340%2FClasslikes%2F32312795" id="1721848340%2FClasslikes%2F32312795"></a>
<div class="table-row" data-filterable-current=":/commonMain,:/metalMain,:/oglMain" data-filterable-set=":/commonMain,:/metalMain,:/oglMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-buffer-renderer/index"><span>ZBuffer</span><wbr/><span><span>Renderer</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="1721848340%2FClasslikes%2F32312795"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted with-platform-tabs" data-platform-hinted="data-platform-hinted">
<div class="platform-bookmarks-row" data-toggle-list="data-toggle-list"><button class="platform-bookmark" data-active="" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain" data-toggle=":/commonMain">common</button><button class="platform-bookmark" data-filterable-current=":/metalMain" data-filterable-set=":/metalMain" data-toggle=":/metalMain">metal</button><button class="platform-bookmark" data-filterable-current=":/oglMain" data-filterable-set=":/oglMain" data-toggle=":/oglMain">ogl</button></div>
<div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><span class="token keyword">expect </span><span class="token keyword">class </span><a href="-z-buffer-renderer/index">ZBufferRenderer</a><span class="token punctuation">(</span><span class="parameters"><span class="parameter">ctx<span class="token operator">: </span><a href="../zernikalos.context/-z-rendering-context/index">ZRenderingContext</a><span class="token punctuation">, </span></span><span class="parameter">data<span class="token operator">: </span><a href="-z-buffer-data/index">ZBufferData</a></span></span><span class="token punctuation">)</span> : <a href="../zernikalos.components/-z-component-render/index">ZComponentRender</a><span class="token operator">&lt;</span><a href="-z-buffer-data/index">ZBufferData</a><span class="token operator">&gt; </span></div></div><div class="content sourceset-dependent-content" data-togglable=":/metalMain"><div class="symbol monospace"><span class="token keyword">actual </span><span class="token keyword">class </span><a href="-z-buffer-renderer/index">ZBufferRenderer</a><span class="token punctuation">(</span><span class="parameters"><span class="parameter">ctx<span class="token operator">: </span><a href="../zernikalos.context/-z-rendering-context/index">ZRenderingContext</a><span class="token punctuation">, </span></span><span class="parameter">data<span class="token operator">: </span><a href="-z-buffer-data/index">ZBufferData</a></span></span><span class="token punctuation">)</span> : <a href="../zernikalos.components/-z-component-render/index">ZComponentRender</a><span class="token operator">&lt;</span><a href="-z-buffer-data/index">ZBufferData</a><span class="token operator">&gt; </span></div></div><div class="content sourceset-dependent-content" data-togglable=":/oglMain"><div class="symbol monospace"><span class="token keyword">actual </span><span class="token keyword">class </span><a href="-z-buffer-renderer/index">ZBufferRenderer</a><span class="token punctuation">(</span><span class="parameters"><span class="parameter">ctx<span class="token operator">: </span><a href="../zernikalos.context/-z-rendering-context/index">ZRenderingContext</a><span class="token punctuation">, </span></span><span class="parameter">data<span class="token operator">: </span><a href="-z-buffer-data/index">ZBufferData</a></span></span><span class="token punctuation">)</span> : <a href="../zernikalos.components/-z-component-render/index">ZComponentRender</a><span class="token operator">&lt;</span><a href="-z-buffer-data/index">ZBufferData</a><span class="token operator">&gt; </span></div></div> </div>
</div>
</div>
</div>
</div>
<a anchor-label="ZMesh" data-filterable-set=":/commonMain" data-name="-1155759094%2FClasslikes%2F1558683979" id="-1155759094%2FClasslikes%2F1558683979"></a>
<div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-mesh/index"><span><span>ZMesh</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="-1155759094%2FClasslikes%2F1558683979"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted" data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><div class="block"><div class="block"><span class="token annotation builtin">@</span><span data-unresolved-link="kotlinx.serialization/Serializable///PointingToDeclaration/"><span class="token annotation builtin">Serializable</span></span><span class="token punctuation">(</span><span>with<span class="token operator"> = </span><span data-unresolved-link="zernikalos.components.mesh/ZMeshSerializer///PointingToDeclaration/">ZMeshSerializer::class</span></span><wbr/><span class="token punctuation">)</span></div></div><span class="token keyword">class </span><a href="-z-mesh/index">ZMesh</a> : <a href="../zernikalos.components/-z-renderizable-component/index">ZRenderizableComponent</a><span class="token operator">&lt;</span><span data-unresolved-link="zernikalos.components.mesh/ZMeshData///PointingToDeclaration/">ZMeshData</span><span class="token punctuation">, </span><span data-unresolved-link="zernikalos.components.mesh/ZMeshRenderer///PointingToDeclaration/">ZMeshRenderer</span><span class="token operator">&gt; </span>, <a href="../zernikalos.components/-z-bindeable/index">ZBindeable</a>, <a href="../zernikalos.components/-z-renderizable/index">ZRenderizable</a></div><div class="brief"><p class="paragraph">Mesh will provide: A relationship between the BufferKey and its RawBuffers in a more cohesive way providing just Buffers</p></div></div></div>
</div>
</div>
</div>
</div>
<a anchor-label="ZMeshRenderer" data-filterable-set=":/metalMain,:/oglMain" data-name="1637559175%2FClasslikes%2F-1731436516" id="1637559175%2FClasslikes%2F-1731436516"></a>
<div class="table-row" data-filterable-current=":/metalMain,:/oglMain" data-filterable-set=":/metalMain,:/oglMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-mesh-renderer/index"><span>ZMesh</span><wbr/><span><span>Renderer</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="1637559175%2FClasslikes%2F-1731436516"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted with-platform-tabs" data-platform-hinted="data-platform-hinted">
<div class="platform-bookmarks-row" data-toggle-list="data-toggle-list"><button class="platform-bookmark" data-active="" data-filterable-current=":/metalMain" data-filterable-set=":/metalMain" data-toggle=":/metalMain">metal</button><button class="platform-bookmark" data-filterable-current=":/oglMain" data-filterable-set=":/oglMain" data-toggle=":/oglMain">ogl</button></div>
<div class="content sourceset-dependent-content" data-active="" data-togglable=":/metalMain"><div class="symbol monospace"><span class="token keyword">actual </span><span class="token keyword">class </span><a href="-z-mesh-renderer/index">ZMeshRenderer</a><span class="token punctuation">(</span><span class="parameters"><span class="parameter">ctx<span class="token operator">: </span><a href="../zernikalos.context/-z-rendering-context/index">ZRenderingContext</a><span class="token punctuation">, </span></span><span class="parameter">data<span class="token operator">: </span><span data-unresolved-link="zernikalos.components.mesh/ZMeshData///PointingToDeclaration/">ZMeshData</span></span></span><span class="token punctuation">)</span> : <a href="../zernikalos.components/-z-component-render/index">ZComponentRender</a><span class="token operator">&lt;</span><span data-unresolved-link="zernikalos.components.mesh/ZMeshData///PointingToDeclaration/">ZMeshData</span><span class="token operator">&gt; </span></div></div><div class="content sourceset-dependent-content" data-togglable=":/oglMain"><div class="symbol monospace"><span class="token keyword">actual </span><span class="token keyword">class </span><a href="-z-mesh-renderer/index">ZMeshRenderer</a> : <a href="../zernikalos.components/-z-base-component-render/index">ZBaseComponentRender</a></div></div> </div>
</div>
</div>
</div>
</div>
<a anchor-label="ZVertexArray" data-filterable-set=":/oglMain" data-name="-1668814122%2FClasslikes%2F-958240383" id="-1668814122%2FClasslikes%2F-958240383"></a>
<div class="table-row" data-filterable-current=":/oglMain" data-filterable-set=":/oglMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-vertex-array/index"><span>ZVertex</span><wbr/><span><span>Array</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="-1668814122%2FClasslikes%2F-958240383"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted with-platform-tabs" data-platform-hinted="data-platform-hinted">
<div class="platform-bookmarks-row" data-toggle-list="data-toggle-list"><button class="platform-bookmark" data-active="" data-filterable-current=":/oglMain" data-filterable-set=":/oglMain" data-toggle=":/oglMain">ogl</button></div>
<div class="content sourceset-dependent-content" data-active="" data-togglable=":/oglMain"><div class="symbol monospace"><span class="token keyword">class </span><a href="-z-vertex-array/index">ZVertexArray</a> : <a href="../zernikalos.components/-z-light-component/index">ZLightComponent</a><span class="token operator">&lt;</span><a href="-z-vertex-array-renderer/index">ZVertexArrayRenderer</a><span class="token operator">&gt; </span>, <a href="../zernikalos.components/-z-bindeable/index">ZBindeable</a></div></div> </div>
</div>
</div>
</div>
</div>
<a anchor-label="ZVertexArrayRenderer" data-filterable-set=":/oglMain" data-name="315164243%2FClasslikes%2F-958240383" id="315164243%2FClasslikes%2F-958240383"></a>
<div class="table-row" data-filterable-current=":/oglMain" data-filterable-set=":/oglMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="-z-vertex-array-renderer/index"><span>ZVertex</span><wbr/><span>Array</span><wbr/><span><span>Renderer</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="315164243%2FClasslikes%2F-958240383"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted with-platform-tabs" data-platform-hinted="data-platform-hinted">
<div class="platform-bookmarks-row" data-toggle-list="data-toggle-list"><button class="platform-bookmark" data-active="" data-filterable-current=":/oglMain" data-filterable-set=":/oglMain" data-toggle=":/oglMain">ogl</button></div>
<div class="content sourceset-dependent-content" data-active="" data-togglable=":/oglMain"><div class="symbol monospace"><span class="token keyword">class </span><a href="-z-vertex-array-renderer/index">ZVertexArrayRenderer</a><span class="token punctuation">(</span><span class="parameters"><span class="parameter">ctx<span class="token operator">: </span><a href="../zernikalos.context/-z-rendering-context/index">ZRenderingContext</a></span></span><span class="token punctuation">)</span> : <a href="../zernikalos.components/-z-base-component-render/index">ZBaseComponentRender</a></div></div> </div>
</div>
</div>
</div>
</div>
</div>
</div>
<div data-togglable="FUNCTION">
<h2 class="">Functions</h2>
<div class="table"><a anchor-label="toMtlFormat" data-filterable-set=":/metalMain" data-name="-1188002429%2FFunctions%2F901085287" id="-1188002429%2FFunctions%2F901085287"></a>
<div class="table-row" data-filterable-current=":/metalMain" data-filterable-set=":/metalMain">
<div class="main-subrow keyValue">
<div class=""><span class="inline-flex">
<div><a href="to-mtl-format"><span>to</span><wbr/><span>Mtl</span><wbr/><span><span>Format</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="-1188002429%2FFunctions%2F901085287"></span>
<div class="copy-popup-wrapper"><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
</span></span></div>
<div>
<div class="title">
<div class="platform-hinted with-platform-tabs" data-platform-hinted="data-platform-hinted">
<div class="platform-bookmarks-row" data-toggle-list="data-toggle-list"><button class="platform-bookmark" data-active="" data-filterable-current=":/metalMain" data-filterable-set=":/metalMain" data-toggle=":/metalMain">metal</button></div>
<div class="content sourceset-dependent-content" data-active="" data-togglable=":/metalMain"><div class="symbol monospace"><span class="token keyword">fun </span><a href="to-mtl-format"><span class="token function">toMtlFormat</span></a><span class="token punctuation">(</span><span class="parameters"><span class="parameter">dataType<span class="token operator">: </span><a href="../zernikalos/-z-data-type/index">ZDataType</a></span></span><span class="token punctuation">)</span><span class="token operator">: </span><span data-unresolved-link="platform.Metal/MTLVertexFormat///PointingToDeclaration/">MTLVertexFormat</span></div></div> </div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
