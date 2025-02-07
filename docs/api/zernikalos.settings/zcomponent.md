# ZComponent

<div class="main-content" data-page-type="classlike" id="content" pageIds="Zernikalos::zernikalos.components/ZComponent///PointingToDeclaration//1558683979">

  <div class="cover ">
    <div class="platform-hinted " data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><span class="token keyword">interface </span><a href="index.html">ZComponent</a> : <a href="../-z-ref/index.html">ZRef</a><span class="clearfix"><span class="floating-right">(<a href="https://example.com/src/commonMain/kotlin/zernikalos/components/ZComponent.kt#L44">source</a>)</span></span></div><p class="paragraph">Represents a component in Zernikalos.</p><p class="paragraph">These will encapsulate two different types of components: Basic components: For data storage and sharing Renderizable components: Which will be able to interact with the graphics APIs</p><h4 class="">Inheritors</h4><div class="table"><div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain"><div class="main-subrow keyValue "><div class=""><span class="inline-flex"><div><a href="../-z-base-component/index.html">ZBaseComponent</a></div></span></div><div></div></div></div></div></div></div>
  </div>
  <div class="tabbedcontent">
    <div class="tabs-section" tabs-section="tabs-section"><button class="section-tab" data-active="" data-togglable="CONSTRUCTOR,TYPE,PROPERTY,FUNCTION">Members</button></div>
    <div class="tabs-section-body">
      <div data-togglable="PROPERTY">
        <h2 class="">Properties</h2>
        <div class="table"><a data-name="345329692%2FProperties%2F1558683979" anchor-label="isInitialized" id="345329692%2FProperties%2F1558683979" data-filterable-set=":/commonMain"></a>
          <div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
            <div class="main-subrow keyValue ">
              <div class=""><span class="inline-flex">
                  <div><a href="is-initialized.html"><span>is</span><wbr></wbr><span><span>Initialized</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="345329692%2FProperties%2F1558683979"></span>
                    <div class="copy-popup-wrapper "><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
                  </span></span></div>
              <div>
                <div class="title">
                  <div class="platform-hinted " data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><span class="token keyword">abstract </span><span class="token keyword">val </span><a href="is-initialized.html">isInitialized</a><span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-boolean/index.html">Boolean</a></div><div class="brief "><p class="paragraph">Represents a boolean value indicating whether a component has been initialized.</p></div></div></div>
                </div>
              </div>
            </div>
          </div>
<a data-name="1549056361%2FProperties%2F1558683979" anchor-label="isRenderizable" id="1549056361%2FProperties%2F1558683979" data-filterable-set=":/commonMain"></a>
          <div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
            <div class="main-subrow keyValue ">
              <div class=""><span class="inline-flex">
                  <div><a href="is-renderizable.html"><span>is</span><wbr></wbr><span><span>Renderizable</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="1549056361%2FProperties%2F1558683979"></span>
                    <div class="copy-popup-wrapper "><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
                  </span></span></div>
              <div>
                <div class="title">
                  <div class="platform-hinted " data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><span class="token keyword">abstract </span><span class="token keyword">val </span><a href="is-renderizable.html">isRenderizable</a><span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-boolean/index.html">Boolean</a></div><div class="brief "><p class="paragraph">Represents a boolean value indicating whether a component is renderizable.</p></div></div></div>
                </div>
              </div>
            </div>
          </div>
<a data-name="-1284049214%2FProperties%2F1558683979" anchor-label="refId" id="-1284049214%2FProperties%2F1558683979" data-filterable-set=":/commonMain"></a>
          <div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
            <div class="main-subrow keyValue ">
              <div class=""><span class="inline-flex">
                  <div><a href="../-z-ref/ref-id.html"><span>ref</span><wbr></wbr><span><span>Id</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="-1284049214%2FProperties%2F1558683979"></span>
                    <div class="copy-popup-wrapper "><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
                  </span></span></div>
              <div>
                <div class="title">
                  <div class="platform-hinted " data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><span class="token keyword">abstract </span><span class="token keyword">val </span><a href="../-z-ref/ref-id.html">refId</a><span class="token operator">: </span><a href="https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-int/index.html">Int</a></div><div class="brief "><p class="paragraph">Represents the unique reference identifier for a component.</p></div></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-togglable="FUNCTION">
        <h2 class="">Functions</h2>
        <div class="table"><a data-name="1652971004%2FFunctions%2F1558683979" anchor-label="initialize" id="1652971004%2FFunctions%2F1558683979" data-filterable-set=":/commonMain"></a>
          <div class="table-row" data-filterable-current=":/commonMain" data-filterable-set=":/commonMain">
            <div class="main-subrow keyValue ">
              <div class=""><span class="inline-flex">
                  <div><a href="initialize.html"><span><span>initialize</span></span></a></div>
<span class="anchor-wrapper"><span class="anchor-icon" pointing-to="1652971004%2FFunctions%2F1558683979"></span>
                    <div class="copy-popup-wrapper "><span class="copy-popup-icon"></span><span>Link copied to clipboard</span></div>
                  </span></span></div>
              <div>
                <div class="title">
                  <div class="platform-hinted " data-platform-hinted="data-platform-hinted"><div class="content sourceset-dependent-content" data-active="" data-togglable=":/commonMain"><div class="symbol monospace"><span class="token keyword">abstract </span><span class="token keyword">fun </span><a href="initialize.html"><span class="token function">initialize</span></a><span class="token punctuation">(</span><span class="parameters "><span class="parameter ">ctx<span class="token operator">: </span><a href="../../zernikalos.context/-z-rendering-context/index.html">ZRenderingContext</a></span></span><span class="token punctuation">)</span></div><div class="brief "><p class="paragraph">Initializes the ZComponent using the provided ZRenderingContext.</p></div></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
