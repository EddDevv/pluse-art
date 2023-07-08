import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pdf from "react-to-pdf";

const i = 1;
const ref = React.createRef();

export const FormContract = () => {
  const { allInfoUser } = useSelector((state) => state);
  const [isVisible]= useState(true)

  const options = {
    // orientation: 'landscape',
    // unit: 'in',
    // format: [4,2]
    format: "a4"
};
 
  return (
    <>
      <Pdf targetRef={ref} filename="example.pdf" options={options}>
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>
      
      {isVisible && <div ref={ref} style={{background: "white",   color: "black", width: "780px", padding: "20px",
      fontFamily: "TimesNewRomanRegular",
      // position: "absolute",
      // top: "0px",
      // left: "0px",
      // opacity: "20%"
    }}
        dangerouslySetInnerHTML={{
          __html: `
          <div class="WordSection1">

          <p class="MsoNormal" align="center" style="text-align:center"><b><span style="mso-ansi-language:RU">ИНВЕСТИЦИОННЫЙ ДОГОВОР № ${i}______</span></b><span style="mso-ansi-language:RU"><o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph"><span style="mso-ansi-language:RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph"><span style="mso-ansi-language:RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph"><span style="mso-ansi-language:RU">г. Бишкек <span style="mso-tab-count:6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="mso-spacerun:yes">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>_<span class="GramE">_<span style="mso-spacerun:yes">&nbsp; </span>_</span>________________ 202 __ г.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph"><span style="mso-ansi-language:RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph"><span style="mso-ansi-language:RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0"><b><span style="mso-ansi-language:
          RU">Мы, нижеподписавшиеся, <o:p></o:p></span></b></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">${allInfoUser?.value?.lastName} ${allInfoUser?.value?.firstName}______________________________________________________________
          </span><span style="font-size:10.0pt;mso-ansi-language:RU">(ФИО, паспортные
          данные, ПИН, адрес регистрации для <span class="SpellE">физ</span> лица или
          наименование юр лица, ИНН, Свидетельство о регистрации, место регистрации)</span><span style="mso-ansi-language:RU">, именуемый в дальнейшем <b>Инвестор</b>,
          действующий на основании гражданского законодательства Кыргызской Республики, с
          одной стороны,<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">и <span class="SpellE"><span class="GramE">ОсОО</span></span><span class="GramE"><span style="mso-spacerun:yes">&nbsp; </span>«</span>Пульс-Арт» 204436-3300-ООО , ИНН 02403202210142
          , <span class="SpellE">Кыргызская</span> Республика <span class="SpellE">г.Бишкек</span>
          <span class="SpellE">ул.Турусбекова</span> д 9<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">в лице Генерального Директора <span class="SpellE">Ерихова</span> Дениса <span class="GramE">Александровича ,</span> действующего на основании Устава и прав,
          предоставленных по должности, именуемый в дальнейшем <b style="mso-bidi-font-weight:
          normal">Брокер</b>, вместе именуемые Стороны, заключили настоящей
          Инвестиционный договор <span style="mso-spacerun:yes">&nbsp;</span>(далее по тексту
          - Договор) на следующих условиях.<span style="mso-spacerun:yes">&nbsp; </span><o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph"><span style="mso-ansi-language:RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level1 lfo11"><!--[if !supportLists]--><b><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">1. </span></span></b><!--[endif]--><b><span style="mso-ansi-language:RU">ТЕРМИНЫ И ОПРЕДЕЛЕНИЯ <o:p></o:p></span></b></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph"><span style="mso-ansi-language:RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level2 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">1.1. </span></span><!--[endif]--><b><span style="mso-ansi-language:RU">Инвестиционный <span class="GramE">договор <span style="mso-spacerun:yes">&nbsp;</span><span style="font-weight:normal">-</span></span></span></b><span style="mso-ansi-language:RU"> договор, заключённый между Сторонами, в отношении
          инвестирования в акции, облигации, ценные бумаги, а также о взаимных
          обязательствах <span style="mso-spacerun:yes">&nbsp;</span>по партнёрству между
          Сторонами, объем и формы предоставления финансирования, а также иные условия.
          Настоящий договор рассматривается Сторонам как предпринимательская деятельность
          и не регулируется законодательством о защите прав потребителей. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level2 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">1.2. </span></span><!--[endif]--><b><span style="mso-ansi-language:RU">Инвестор</span></b><span style="mso-ansi-language:
          RU"> – сторона, предоставляющая инвестиции Получателю инвестиций с целью
          получения прибыли. Инвестором может быть физическое (резидент или не резидент)
          или юридическое лицо (отечественная или иностранная организация любой формы
          собственности). <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level2 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">1.3. </span></span><!--[endif]--><b><span style="mso-ansi-language:RU">Брокер</span></b><span style="mso-ansi-language:
          RU"> – сторона, получающая инвестиции для достижения целей (по условиям
          настоящего Договора предполагает вложение Инвестиций в акции, облигации, ценные
          бумаги).<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level2 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">1.4. </span></span><!--[endif]--><b><span style="mso-ansi-language:RU">Инвестиции</span></b><span style="mso-ansi-language:
          RU"> - собственные, заёмные и/или привлечённые денежные средства, ценные
          бумаги, иное имущество, вкладываемые Инвестором с целью получения прибыли. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level2 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">1.5. </span></span><!--[endif]--><b><span style="mso-ansi-language:RU">Инвестиционная деятельность</span></b><span style="mso-ansi-language:RU"> – деятельность Получателя инвестиций, связанная с
          вложенными инвестициями для достижения целей, на которые предоставляются
          Инвестиции.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level2 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">1.6. </span></span><!--[endif]--><b><span style="mso-ansi-language:RU">Ущерб </span></b><span style="mso-ansi-language:
          RU">– расходы, которые лицо, чьё право нарушено, произвело или должно будет
          произвести для восстановления нарушенного права, утрата или повреждение
          имущества (реальный ущерб).<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph"><span style="mso-ansi-language:RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level1 lfo11"><!--[if !supportLists]--><b><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">2. </span></span></b><!--[endif]--><b><span style="mso-ansi-language:RU">ПРЕДМЕТ ДОГОВОРА<o:p></o:p></span></b></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span lang="EN-US"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0;mso-list:l0 level2 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">2.1. </span></span><!--[endif]--><span style="mso-ansi-language:RU">Предметом настоящего Договора является передача
          Инвестором в доверительное управление Брокеру инвестиций денежных средств, а
          также деятельность Получателя инвестиций по осуществлению покупки
          (приобретения) на бирже акций, облигаций и иных ценных бумаг в соответствии с
          Общими условиями Договора Оферты <span class="GramE">и <span style="mso-spacerun:yes">&nbsp;</span>законодательством</span> Кыргызской
          Республики.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0;mso-list:l0 level2 lfo11"><!--[if !supportLists]--><b><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">2.2. </span></span></b><!--[endif]--><span style="mso-ansi-language:RU">В соответствии с условиями настоящего Договора Инвестор
          обязуется передать Инвестиции, а Брокер, которому в управление <span class="GramE">поступили <span style="mso-spacerun:yes">&nbsp;</span>инвестиции</span> -
          осуществлять инвестиционную деятельность и возвратить Инвестору полученные инвестиции,
          <b>в сроки и в размере, обговорёнными Сторонами, а также полученные Инвестором
          доходы. <o:p></o:p></b></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0;mso-list:l0 level2 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">2.3. </span></span><!--[endif]--><span style="mso-ansi-language:RU">В соответствии с настоящим <span class="GramE">Договором,
          <span style="mso-spacerun:yes">&nbsp;</span>Инвестиции</span> являются средствами
          целевого назначения и не могут быть использованы Брокером на иные цели помимо
          тех, на которые они предоставляются по Договору в соответствии с п. 2.1.
          настоящего Договора. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0;mso-list:l0 level2 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">2.4. </span></span><!--[endif]--><span style="mso-ansi-language:RU">Объем инвестиционных вложений <span style="mso-spacerun:yes">&nbsp;</span>по настоящему Договору
          составляет__________________________________________________________________________________________________.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0;mso-list:l0 level2 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">2.5. </span></span><!--[endif]--><span style="mso-ansi-language:RU">Стороны договорились, что Инвестор согласен и
          предоставляет право Получателю инвестиций вкладывать Инвестиции в одну из
          выбранных программ, при <span class="GramE">этом <span style="mso-spacerun:yes">&nbsp;</span>Инвестор</span> и Брокер <span style="mso-spacerun:yes">&nbsp;</span>договорились что по<span style="mso-spacerun:yes">&nbsp; </span>инвестициям стороны несут общую<span style="mso-spacerun:yes">&nbsp; </span>ответственность за исполнение обязательств по
          настоящему Договору:<o:p></o:p></span></p>
          
          <table class="MsoTableGrid" border="1" cellspacing="0" cellpadding="0" style="margin-left:24.0pt;border-collapse:collapse;border:none;mso-border-alt:
           solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt">
           <tbody><tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes">
            <td width="187" valign="top" style="width:160.45pt;border:solid windowtext 1.0pt;
            mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
            <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
            mso-pagination:none"><span class="SpellE"><span class="GramE"><span style="mso-ansi-language:RU">Низкорисковынные</span></span></span><span class="GramE"><span style="mso-ansi-language:RU"><span style="mso-spacerun:yes">&nbsp; </span>операции</span></span><span style="mso-ansi-language:RU"> <o:p></o:p></span></p>
            </td>
            <td width="179" valign="top" style="width:160.5pt;border:solid windowtext 1.0pt;
            border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
            solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
            <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
            mso-pagination:none"><span style="mso-ansi-language:RU">Инвестиционный
            портфель который состоит только из<span style="mso-spacerun:yes">&nbsp;&nbsp;
            </span>акций и облигации крупных компаний<o:p></o:p></span></p>
            </td>
            <td width="168" valign="top" style="width:160.5pt;border:solid windowtext 1.0pt;
            border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:
            solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
            <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
            mso-pagination:none"><span style="mso-ansi-language:RU">до 5% ежемесячного
            дохода <o:p></o:p></span></p>
            </td>
           </tr>
           <tr style="mso-yfti-irow:1">
            <td width="187" valign="top" style="width:160.45pt;border:solid windowtext 1.0pt;
            border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
            padding:0cm 5.4pt 0cm 5.4pt">
            <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
            mso-pagination:none"><span class="SpellE"><span style="mso-ansi-language:RU;
            mso-bidi-font-weight:bold">среднерискованные</span></span><span style="mso-ansi-language:RU;mso-bidi-font-weight:bold"> операции</span><span style="mso-ansi-language:RU"><o:p></o:p></span></p>
            </td>
            <td width="179" valign="top" style="width:160.5pt;border-top:none;border-left:
            none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
            mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
            mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
            <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
            mso-pagination:none"><span style="mso-ansi-language:RU">Инвестиционный
            портфель который состоит из <span class="GramE">инвестиций<span style="mso-spacerun:yes">&nbsp; </span>акции</span> и облигации<span style="mso-spacerun:yes">&nbsp; </span>крупных и средних компаний<o:p></o:p></span></p>
            </td>
            <td width="168" valign="top" style="width:160.5pt;border-top:none;border-left:
            none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
            mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
            mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
            <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
            mso-pagination:none"><span style="mso-ansi-language:RU">до 10 % ежемесячного
            дохода <o:p></o:p></span></p>
            </td>
           </tr>
           <tr style="mso-yfti-irow:2;mso-yfti-lastrow:yes">
            <td width="187" valign="top" style="width:160.45pt;border:solid windowtext 1.0pt;
            border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;
            padding:0cm 5.4pt 0cm 5.4pt">
            <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
            mso-pagination:none"><span style="mso-ansi-language:RU;mso-bidi-font-weight:
            bold">высокорискованные операции</span><span style="mso-ansi-language:RU"><o:p></o:p></span></p>
            </td>
            <td width="179" valign="top" style="width:160.5pt;border-top:none;border-left:
            none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
            mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
            mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
            <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
            mso-pagination:none"><span style="mso-ansi-language:RU">Инвестиционный
            портфель который состоит из <span class="GramE">инвестиций<span style="mso-spacerun:yes">&nbsp; </span>в</span> венчурные фонды, и стартапы<o:p></o:p></span></p>
            </td>
            <td width="168" valign="top" style="width:160.5pt;border-top:none;border-left:
            none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
            mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;
            mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt">
            <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
            mso-pagination:none"><span style="mso-ansi-language:RU">до 15 % ежемесячного
            дохода<o:p></o:p></span></p>
            </td>
           </tr>
          </tbody></table>
          
          <p class="MsoNormal" style="margin-left:24.0pt;text-align:justify;text-justify:
          inter-ideograph"><span style="mso-ansi-language:RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph"><span style="mso-ansi-language:RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level1 lfo11"><!--[if !supportLists]--><b><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">3. </span></span></b><!--[endif]--><b><span style="mso-ansi-language:RU">ПРАВА И ОБЯЗАННОСТИ СТОРОН <o:p></o:p></span></b></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0"><b><span style="mso-ansi-language:
          RU">3.1. </span><span lang="EN-US">Инвестор <span class="SpellE">обязан</span>:</span></b><b><span style="mso-ansi-language:RU"><o:p></o:p></span></b></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.1.1. Обеспечить реализацию настоящего Договора путём передачи
          (зачисления) на расчётный счёт или в кассу Брокера <span style="mso-spacerun:yes">&nbsp;</span>суммы инвестиций в размере
          ______________________________________________________________________________
          не позднее 3 дней с даты подписания настоящего Договора.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.1.2. В случае увеличения суммы инвестиций обеспечить дополнительные
          инвестиции для реализации инвестиционного проекта в полном объёме,
          предусмотренном настоящим Договором или Приложениям к нему.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.1.3. Обеспечить соблюдение инвестиционного, финансового, налогового законодательства
          Кыргызской Республики. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.1.4. Возместить в случае несоблюдения обязательств по Договору затраты,
          связанные с предоставлением ему льгот и преференций в соответствии с
          законодательством Кыргызской Республики и настоящим Договором.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.2. <b>Инвестор имеет право:</b><o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.2.1. Получать прибыль от внесённых Инвестиций и реализации
          Инвестиционного проекта. Стороны договорились, что прибыль Инвестора от
          вложенной суммы Инвестиций установлена индивидуально и сроки получения данной
          суммы - один раз в месяц но не ранее числа заключения Договора и не ранее
          условий предусмотренных в п 3.3.5 настоящего Договора. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0"><b><span style="mso-ansi-language:
          RU">3.3. Брокер обязуется</span></b><span style="mso-ansi-language:RU">:<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.3.1. Использовать переданные Инвестиции в соответствии с их целевым
          назначением и условиями выбранного плана программы (операций), предусмотренным
          п.2.5. настоящего Договора.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.3.2. Добросовестно и в установленные настоящим Договором сроки выполнять
          свои договорные обязательства перед Инвестором. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.3.3. Выплачивать Инвестору прибыль, предусмотренную п.3.2.1. в
          соответствии с <span class="GramE">условиями,<span style="mso-spacerun:yes">&nbsp;
          </span>настоящего</span> Договора и Общими условиями Договора Оферты. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.3.4 В случае нарушения сроков, предусмотренных п.3.3.3. <span class="GramE">Брокер <span style="mso-spacerun:yes">&nbsp;</span>обязуется</span>
          выплатить Инвестору неустойку в размере 0,01% (ноль одна сотая) процента за
          каждый день просрочки, но не больше 10% от суммы полученных Инвестиций в
          соответствии с законодательством Кыргызской Республики. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.3.5 Стороны договорились, что обязательство Брокера в выплате прибыли
          Инвестору начинается по истечении трёх рабочих дней с даты поступления на
          расчётный счёт или в кассу <span class="GramE">Брокера <span style="mso-spacerun:yes">&nbsp;</span>всей</span> суммы инвестиций и по истечении
          трёх рабочих дней с даты размещения инвестиций на бирже. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.3.6. Обязательства по выплате<span style="mso-spacerun:yes">&nbsp;&nbsp;
          </span>прибыли и возврату Инвестиций считаются исполненными с момента списания
          денежных <span class="GramE">средств<span style="mso-spacerun:yes">&nbsp; </span>со</span>
          счета Брокера. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0"><b style="mso-bidi-font-weight:
          normal"><span style="mso-ansi-language:RU">3.4. <span class="GramE">Брокер <span style="mso-spacerun:yes">&nbsp;</span>имеет</span> право:<o:p></o:p></span></b></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.4.1. Требовать от Инвестора выполнения условий настоящего Договора и
          Общих условий Договора Оферты.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">3.4.2. Расторгнуть настоящий Договор в случае неисполнения или
          ненадлежащего исполнения настоящего <span class="GramE">Договора <span style="mso-spacerun:yes">&nbsp;</span>Инвестором</span> в одностороннем порядке,
          уведомив посредством личного кабинета Инвестора<span style="mso-spacerun:yes">&nbsp;
          </span>о<span style="mso-spacerun:yes">&nbsp; </span>расторжении договора не менее
          чем за 10 дней до предстоящей даты расторжения Договора. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level1 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">4. </span></span><!--[endif]--><b><span style="mso-ansi-language:RU">ПОРЯДОК РАСЧЁТОВ</span></b><span style="mso-ansi-language:
          RU"><o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">4.1. По настоящему Договору Сторон инвестиции определяются в сомовом
          эквиваленте по официальному курсу по отношению к <span style="background:yellow;
          mso-highlight:yellow">доллару <span class="GramE">США<span style="background:
          windowtext;mso-highlight:windowtext"> <span style="mso-spacerun:yes">&nbsp;</span>Национального</span></span></span>
          банка Кыргызской Республики<span style="mso-spacerun:yes">&nbsp; </span>на день
          осуществления расчётов.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">4.2. Сумма Инвестиций по настоящему Договору составляет______________
          ________________________________________________________________________________.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">4.3. Подтверждением исполнения условий <span class="GramE">договора<span style="mso-spacerun:yes">&nbsp; </span>по</span> передаче <span style="mso-spacerun:yes">&nbsp;</span>Инвестиций являются: выписка из личного
          кабинета Инвестора, заверенная уполномоченным сотрудником Брокера и/или <span style="mso-spacerun:yes">&nbsp;</span>приходный кассовый ордер, квитанция на взнос
          наличными в банк на р/с Брокера. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">4.4. Подтверждением получения Инвестором суммы прибыли или возврата суммы
          Инвестиций являются расходный кассовый ордер Брокера, банковские или иные
          финансовые документы, подтверждающие получение суммы прибыли или суммы
          Инвестиций Инвестором в соответствии с условиями настоящего Договора.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">4.5. Стороны определили, что в соответствии с Налоговым кодексом Кыргызской
          Республики, Получатель инвестиций является налоговым агентом физического лица
          (резидента и/ или нерезидента Кыргызской Республики) и при выплате суммы
          прибыли<span style="mso-spacerun:yes">&nbsp;&nbsp; </span>Инвестиций удерживает и
          перечисляет в бюджет Кыргызской Республики сумму подоходного налога. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level1 lfo11"><!--[if !supportLists]--><b><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">5. </span></span></b><!--[endif]--><b><span style="mso-ansi-language:RU">РЕАЛИЗАЦИЯ ИНВЕСТИЦИОННОГО ПРОЕКТА<o:p></o:p></span></b></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0;mso-list:l0 level2 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">5.1. </span></span><!--[endif]--><span style="mso-ansi-language:RU">Стороны договорились, что Получатель инвестиций
          имеет право вкладывать сумму полученных инвестиций по своему усмотрению, исходя
          из договорённости Сторон о вложении в <span class="SpellE">низкорискованные</span>,
          <span class="SpellE">среднерискованные</span> или <span class="SpellE">высокорискованные</span>
          проекты. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph"><span style="mso-ansi-language:RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level1 lfo11"><!--[if !supportLists]--><b><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">6. </span></span></b><!--[endif]--><b><span style="mso-ansi-language:RU">СРОКИ ДЕЙСТВИЯ ДОГОВОРА<o:p></o:p></span></b></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">6.1. Договор считается заключенным с момента<span style="mso-spacerun:yes">&nbsp; </span>подписания его Сторонами,<span style="mso-spacerun:yes">&nbsp; </span>а вступает в силу с момента зачисления<span style="mso-spacerun:yes">&nbsp; </span>денежных средств на счет Брокера, либо с
          момента внесения денежных средств (Инвестиций) в кассу Брокера и действует в
          течение срока действия выбранной программы, либо до расторжения его в порядке
          3.4.2 Договора. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">6.2. <span style="mso-spacerun:yes">&nbsp;</span>В случае <span class="GramE">если
          <span style="mso-spacerun:yes">&nbsp;</span>Инвестор</span> <span style="mso-spacerun:yes">&nbsp;</span>изъявит желание о его расторжении Договора <span style="mso-spacerun:yes">&nbsp;</span>до срока реализации выбранной программы,<span style="mso-spacerun:yes">&nbsp; </span>он <span style="mso-spacerun:yes">&nbsp;</span>обязуется
          письменно (путём направления почтового уведомления или на электронную почту
          Стороны) уведомить<span style="mso-spacerun:yes">&nbsp; </span>Брокера о своем
          намерении не менее, чем за <span style="mso-spacerun:yes">&nbsp;</span>3 календарных
          дня. При этом Получатель инвестиций обязуется возвратить сумму вложенных
          инвестиций с начисленной за период до расторжения настоящего Договора прибыли
          (без учётов налогов) в срок не позднее 14 рабочих дней с даты расторжения
          Договора.<span style="mso-spacerun:yes">&nbsp; </span>При этом прибыль выплачивается
          в полном <span class="GramE">размере .</span><o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">6.3.<span style="mso-spacerun:yes">&nbsp; </span>Договор заключен в двух
          экземплярах на русском языке, по одному <span class="GramE">для<span style="mso-spacerun:yes">&nbsp; </span>каждой</span><span style="mso-spacerun:yes">&nbsp;
          </span>из<span style="mso-spacerun:yes">&nbsp; </span>сторон,<span style="mso-spacerun:yes">&nbsp; </span>при этом каждый экземпляр имеет одинаковую
          юридическую силу.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level1 lfo11"><!--[if !supportLists]--><b><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">7. </span></span></b><!--[endif]--><b><span style="mso-ansi-language:RU">ИЗМЕНЕНИЯ И ДОПОЛНЕНИЯ <o:p></o:p></span></b></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">7.1. Все изменения и дополнения <span class="GramE">к <span style="mso-spacerun:yes">&nbsp;</span>настоящему</span> Договору оформляется в
          письменной форме путём подписания дополнений со ссылкой на Договор и
          подписываются обеими сторонами.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">7.2. Основанием для изменения условий настоящего Договора могут являться <span class="GramE">также <span style="mso-spacerun:yes">&nbsp;</span>существенное</span>
          изменение обстоятельств, из которых Стороны исходили при заключении настоящего Договора,
          а также Соглашение Сторон, которое оформляется Дополнительным соглашением в той
          же форме, что и основной Договор ( письменно). <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">7.3.<span style="mso-spacerun:yes">&nbsp; </span>Инвестор не имеет права
          передавать без согласия Сторон третьим лицам свои права и обязанности по
          настоящему Договору путём уступки требования или перевода долга по настоящему Договору.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">7.4. При реорганизации одной из Сторон все права и обязанности Стороны по Договору
          передаются в полном объёме правопреемнику реорганизованной Стороны. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level1 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">8. </span></span><!--[endif]--><b><span style="mso-ansi-language:RU">ФОРС-МАЖОР</span></b><span style="mso-ansi-language:
          RU"><o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">8.1. При наступлении обстоятельств непреодолимой силы, находящихся вне
          разумного предвидения и контроля сторон, Стороны освобождаются от
          ответственности по обязательствам, связанным с полным или частичным
          неисполнением настоящего <span class="GramE">Договора <span style="mso-spacerun:yes">&nbsp;</span>на</span> время действия таких обстоятельств
          либо их последствий.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">8.2. Стороны договорились и отнесли к обстоятельствам форс-мажора следующее
          - война и военные действия, стихийные или иные бедствия происходящие в районах
          официально признанных таковыми, действия правительства, запрещающих
          деятельность, включающую в себя предмет Договора.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">8.3. О наступлении и прекращении форс-мажорных обстоятельств, о
          предполагаемых <span class="GramE">сроках<span style="mso-spacerun:yes">&nbsp;
          </span>их</span><span style="mso-spacerun:yes">&nbsp; </span>действия<span style="mso-spacerun:yes">&nbsp; </span>немедленно в письменном виде за подписью
          уполномоченных на это организаций.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">8.4. Сторона, для которой создались обстоятельства, принятые в настоящем Договоре
          как форс-мажорные, обязана предпринять все зависящие от неё действия с целью
          уменьшения нанесённого таким обстоятельствами ущерба для обеих сторон, а в
          случае непринятия необходимых мер по сохранению любых ценностей, находящихся в
          распоряжении<span style="mso-spacerun:yes">&nbsp; </span>сторон<span style="mso-spacerun:yes">&nbsp; </span>обязана покрыть эти убытки другой стороне.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">8.5. Наступление форс-мажорных обстоятельств должно быть подтверждено
          торгово-промышленной палатой Кыргызской Республики.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level1 lfo11"><!--[if !supportLists]--><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">9. </span></span><!--[endif]--><b><span style="mso-ansi-language:RU">ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ</span></b><span style="mso-ansi-language:RU"><o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">9.1. В случае возникновения между сторонами спора, спор подлежит
          урегулированию путём непосредственных переговоров Инвестора и Получателя
          Инвестиций.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">9.2. Претензионные письма направляются Сторонами путём факсимильной связи,
          электронной почтой, курьерской почтой либо заказным почтовым отправлением, срок
          для рассмотрения претензии составляет 30 календарных дней с даты ее получения. При
          этом Стороны признают претензионный порядок обязательным для разрешения спора в
          досудебном порядке. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">9.3. Споры разрешаются в соответствии с законодательством Кыргызской
          Республики. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="margin-left:0cm;text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0;mso-list:l0 level1 lfo11"><!--[if !supportLists]--><b><span style="mso-fareast-font-family:&quot;Times New Roman&quot;;mso-bidi-font-family:&quot;Times New Roman&quot;;
          mso-ansi-language:RU"><span style="mso-list:Ignore">10. </span></span></b><!--[endif]--><b><span style="mso-ansi-language:RU">ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ <o:p></o:p></span></b></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">10.1.Односторонний отказ какой либо Стороны от исполнения обязательств по <span class="GramE">Договору<span style="mso-spacerun:yes">&nbsp; </span>допускается</span>/
          не допускается.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">10.2. Сторона, изменившая своё местонахождение и (или) платёжные реквизиты,
          <span style="mso-spacerun:yes">&nbsp;</span>а также<span style="mso-spacerun:yes">&nbsp;
          </span>паспортные данные, обязана сообщить об этом другой Стороне в течение 5
          (пяти) (можно изменить) рабочих дней со дня такого изменения, путем размещения
          информации в личном кабинете Инвестора, либо письменно предоставить
          информацию<span style="mso-spacerun:yes">&nbsp; </span>в<span style="mso-spacerun:yes">&nbsp; </span>офис Брокера.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">10.3. Действия, совершенные по прежним платёжным или почтовым реквизитам до
          поступления уведомления об их изменении, признаются надлежащими действиями по
          исполнению условий Договора.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">10.4. Вся финансовая и другая информация, <span class="SpellE">упоминающаяся</span>
          в тексте Договора, приложений и дополнительных соглашений к нему, является
          конфиденциальной. <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">10.5. Ни одна из Сторон не вправе раскрывать такую информацию в течение
          срока действия Договора полностью или частично третьим лицам без предварительного
          письменного согласия на то другой Стороны, если это не вытекает из требований
          нормативных правовых актов или существа соответствующего обязательства,
          установленного Договором.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">10.6.В случае признания любого из положений настоящего Договора или его применения
          недействительным, незаконным или не обеспеченным правовой санкцией в каком-либо
          отношении, это не влияет на действительность, законность и обеспеченность
          правовой санкцией остальных положений настоящего Договора и любого иного их
          применения и не ущемляет их.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">10.7.В <span class="GramE">Договор <span style="mso-spacerun:yes">&nbsp;</span>вносится</span> письменное изменение, согласно
          которому такое положение заменяется положением, обеспеченным правовой санкцией
          и являющимся взаимоприемлемым для всех Сторон.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><span style="mso-spacerun:yes">&nbsp;</span><o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.1pt;mso-char-indent-count:2.0"><b><span style="mso-ansi-language:
          RU">11. РЕКВИЗИТЫ<o:p></o:p></span></b></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">Подписывая настоящей Договор, Стороны документально подтверждают, что в
          установленном порядке наделены соответствующими необходимыми полномочиями на
          заключение настоящего Договора на изложенных в нем условиях.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">Стороны заявляют и гарантируют, что заключением настоящего Договора они не
          нарушают какие бы то ни было иные <span class="GramE">соглашения ,</span>
          договора или иные обязательства в отношении третьих лиц.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">Стороны изучили текст настоящего Договора , в полной мере понимают его
          значение и осознают последствия заключения его на изложенных условиях, выражают
          полное и безоговорочное согласие с условиями настоящего Договора.<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">Инвестор:<span style="mso-tab-count:5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span><span style="mso-tab-count:1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Брокер: <o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU">Подпись: ______________________<span style="mso-tab-count:2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Подпись:
          _________________________<o:p></o:p></span></p>
          
          <p class="MsoNormal" style="text-align:justify;text-justify:inter-ideograph;
          text-indent:24.0pt;mso-char-indent-count:2.0"><span style="mso-ansi-language:
          RU"><o:p>&nbsp;</o:p></span></p>
          
          </div>
        `,
        }}
      ></div>}
      
    </>
  );
};
