<script setup lang="ts">
import { useHomeStore } from "@/store/home";
import { Component, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";

type link = {
  href: string;
  title: string;
};
//处理点击锚点后正常的锚点链接跳转
function anchorClickHandler(e: Event, link: link): void {
  e.preventDefault(); //阻止antd锚点的默认跳转
  let element = document.querySelector(link.href);
  element!.scrollIntoView({ block: "start", behavior: "smooth" });
}
const container = ref(null);
const footer = ref(null);
const content = ref(null);

onMounted(() => {
  let contentEle = content.value! as HTMLElement;
  let footerEle = footer.value!.$el as HTMLElement;
  let height = 40 + contentEle.offsetHeight; //40是header的高度，固定值
  footerEle.style.position = "absolute";
  footerEle.style.top = height + "px";
});
</script>

<template>
  <div class="container" ref="container">
    <TopHeader />
    <a-anchor class="anchor" @click="anchorClickHandler">
      <a-anchor-link href="#introduction" title="Introduction" />
      <a-anchor-link href="#history" title="History" />
      <a-anchor-link href="#program" title="Program"/> 
    </a-anchor>
    <div class="content" ref="content">
      <div class="title">Natural Resources Defense Council</div>
      <div id="introduction">
        <div class="logo">
          <img src="/images/NRDC_bear_logo.svg.png" alt="" />
          <div class="tag">
            <ul>
              <li class="key">Abbreviation</li>
              <li class="value">NRDC</li>
              <li class="key">Type</li>
              <li class="value">Non-profit</li>
              <li class="key">Purpose</li>
              <li class="value">Environmental activism</li>
            </ul>
          </div>
        </div>
        <div class="details">
          <p>
            The Natural Resources Defense Council (NRDC) is a United
            States-based 501(c)(3) non-profit international environmental
            advocacy group, with its headquarters in New York City and offices
            in Washington D.C., San Francisco, Los Angeles, Chicago, Bozeman,
            and Beijing. Founded in 1970, as of 2019, the NRDC had over three
            million members, with online activities nationwide, and a staff of
            about 700 lawyers, scientists and other policy experts
          </p>
          <p>
            了解更多点击
            <a
              href="https://en.wikipedia.org/wiki/Natural_Resources_Defense_Council"
              >维基百科</a
            >
          </p>
        </div>
      </div>
      <div class="wiki" id="history">
        <div class="title">History</div>
        <p>
          The NRDC was founded in 1970.Its establishment was partially an
          outgrowth of the Scenic Hudson Preservation Conference v. Federal
          Power Commission, the Storm King case. The case centered on Con Ed's
          plan to build the world's largest hydroelectric facility at Storm King
          Mountain. The proposed facility would have pumped vast amounts of
          water from the Hudson River to a reservoir and released it through
          turbines to generate electricity at peak demand.A dozen concerned
          citizens organized the Scenic Hudson Preservation Conference in
          opposition to the project, citing its environmental impact, and the
          group, represented by Whitney North Seymour Jr., his law partner
          Stephen Duggan, and David Sive, sued the Federal Power Commission and
          successfully achieved a ruling that groups such as Scenic Hudson and
          other environmentalist groups had the standing to challenge the FPC's
          administrative rulings. Realizing that continued environmentalist
          litigation would require a nationally organized, professionalized
          group of lawyers and scientists, Duggan, Seymour, and Sive obtained
          funding from the Ford Foundation and joined forces with Gus Speth and
          three other recent Yale Law School graduates of the class of 1969:
          Richard Ayres, Edward Strohbehn Jr. and John Bryson. John H. Adams was
          the group's first staff member and Duggan its founding chairman;[10]
          Seymour, Laurance Rockefeller, and others served as members of the
          board. \nNRDC published onEarth, a quarterly magazine that dealt with
          environmental challenges, through 2016. It was founded in 1979 as The
          Amicus Journal. As Amicus, it won the George Polk Award in 1983 for
          special interest reporting.
        </p>
      </div>
      <div class="wiki" id="program">
        <div class="title">Program</div>
        <p>
          The NRDC states the purpose of its work is safeguard the earth—its
          people, its plants and animals, and the natural systems on which all
          life depends,and to ensure the rights of all people to the air, the
          water and the wild, and to prevent special interests from undermining
          public interests. Their stated areas of work include: climate change,
          communities, energy, food, health, oceans, water, the wild \n As a
          legal advocacy group, the NRDC works to accomplish environmental goals
          by operating within the legal system to reduce pollution and protect
          natural resources through litigation, and by working with
          professionals in science, law, and policy at the national and
          international level.
        </p>
      </div>
    </div>
    <About ref="footer" />
  </div>
</template>



<style lang="less" scoped>
@introHeight: 400px;
@imgHeight: 300px;
@anchorWidth: 140px;
.container {
  position: relative;
  .anchor {
    display: block;
    position: fixed;
    width: @anchorWidth;
  }
  .content {
    position: absolute;
    left: @anchorWidth;
    margin: 10px 10px;
    .title {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #000;
      font-size: 24px;
      margin: 20px 0;
      font-weight: 500;
    }
    #introduction {
      height: @introHeight;
      margin-bottom: 20px;
      .logo {
        float: left;
        width: 300px;
        border: 1px solid #000;

        img {
          width: 100%;
          padding: 20px;
          height: @imgHeight;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            flex: 50%;
          }
          .key {
            font-weight: 700;
          }
          .value {
            font-size: 12px;
          }
        }
      }
      .details {
        margin-left: 30px;
        p {
          width: 80%;
          font-size: 16px;
        }
      }
    }
    .wiki {
      margin-bottom: 20px;
      width: 90%;
    }
  }
}
</style>