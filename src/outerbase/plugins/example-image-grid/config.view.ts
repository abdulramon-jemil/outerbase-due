/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-classes-per-file */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  Privileges,
  StyleSheet,
  OuterbasePluginConfig_$PLUGIN_ID
} from "./shared"

const templateConfiguration = document.createElement("template")
templateConfiguration.innerHTML = `
<style>
  #container {
      display: flex;
      height: 100%;
      overflow-y: scroll;
      padding: 40px 50px 65px 40px;
  }

  .field-title {
      font: "Inter", sans-serif;
      font-size: 12px;
      line-height: 18px;
      font-weight: 500;
      margin: 0 0 8px 0;
  }

  select {
      width: 320px;
      height: 40px;
      margin-bottom: 16px;
      background: transparent;
      border: 1px solid #343438;
      border-radius: 8px;
      color: black;
      font-size: 14px;
      padding: 0 8px;
      cursor: pointer;
      background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="32"><path fill="black" d="M480-380 276-584l16-16 188 188 188-188 16 16-204 204Z"/></svg>');
      background-position: 100%;
      background-repeat: no-repeat;
      appearance: none;
      -webkit-appearance: none !important;
      -moz-appearance: none !important;
  }

  button {
      border: none;
      background-color: #834FF8;
      color: white;
      padding: 6px 18px;
      font: "Inter", sans-serif;
      font-size: 14px;
      line-height: 18px;
      border-radius: 8px;
      cursor: pointer;
  }

  .preview-card {
      margin-left: 80px;
      width: 240px;
      background-color: white;
      border-radius: 16px;
      overflow: hidden;
  }

  .preview-card > img {
      width: 100%;
      height: 165px;
  }

  .preview-card > div {
      padding: 16px;
      display: flex; 
      flex-direction: column;
      color: black;
  }

  .preview-card > div > p {
      margin: 0;
  }

  @media (prefers-color-scheme: dark) {
      select {
          color: white;
          background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="32"><path fill="white" d="M480-380 276-584l16-16 188 188 188-188 16 16-204 204Z"/></svg>');
      }
  }
</style>

<div id="container">
  
</div>
`

export class OuterbasePluginTableConfiguration_$PLUGIN_ID extends HTMLElement {
  static get observedAttributes() {
    return Privileges
  }

  config = new OuterbasePluginConfig_$PLUGIN_ID({})

  items = []

  constructor() {
    super()

    // The shadow DOM is a separate DOM tree that is attached to the element.
    // This allows us to encapsulate our styles and markup. It also prevents
    // styles from the parent page from leaking into our plugin.
    this.shadow = this.attachShadow({ mode: "open" })
    this.shadow.appendChild(templateConfiguration.content.cloneNode(true))
    this.shadow?.adoptedStyleSheets = [StyleSheet]
  }

  connectedCallback() {
    // Parse the configuration object from the `configuration` attribute
    // and store it in the `config` property.
    const encodedTableJSON = this.getAttribute("configuration")
    const decodedTableJSON = encodedTableJSON
      ?.replace(/&quot;/g, '"')
      ?.replace(/&#39;/g, "'")
    const configuration = JSON.parse(decodedTableJSON)

    this.config = new OuterbasePluginConfig_$PLUGIN_ID(configuration)

    // Set the items property to the value of the `tableValue` attribute.
    if (this.getAttribute("tableValue")) {
      const encodedTableJSON = this.getAttribute("tableValue")
      const decodedTableJSON = encodedTableJSON
        ?.replace(/&quot;/g, '"')
        ?.replace(/&#39;/g, "'")
      this.items = JSON.parse(decodedTableJSON)
    }

    // Manually render dynamic content
    this.render()
  }

  render() {
    const sample = this.items.length ? this.items[0] : {}
    const keys = Object.keys(sample)

    this.shadow.querySelector("#container").innerHTML = `
      <div style="flex: 1;">
          <p class="field-title">Image Key</p>
          <select id="imageKeySelect">
              ${keys
                .map(
                  (key) =>
                    `<option value="${key}" ${
                      key === this.config.imageKey ? "selected" : ""
                    }>${key}</option>`
                )
                .join("")}
          </select>

          <p class="field-title">Title Key</p>
          <select id="titleKeySelect">
              ${keys
                .map(
                  (key) =>
                    `<option value="${key}" ${
                      key === this.config.titleKey ? "selected" : ""
                    }>${key}</option>`
                )
                .join("")}
          </select>

          <p class="field-title">Description Key</p>
          <select id="descriptionKeySelect">
              ${keys
                .map(
                  (key) =>
                    `<option value="${key}" ${
                      key === this.config.descriptionKey ? "selected" : ""
                    }>${key}</option>`
                )
                .join("")}
          </select>

          <p class="field-title">Subtitle Key</p>
          <select id="subtitleKeySelect">
              ${keys
                .map(
                  (key) =>
                    `<option value="${key}" ${
                      key === this.config.subtitleKey ? "selected" : ""
                    }>${key}</option>`
                )
                .join("")}
          </select>

          <div style="margin-top: 8px;">
              <button id="saveButton">Save View</button>
          </div>
      </div>

      <div>
          <div class="preview-card">
              <img src="${
                sample[this.config.imageKey]
              }" width="100" height="100">

              <div>
                  <p style="margin-bottom: 8px; font-weight: bold; font-size: 16px; line-height: 24px; font-family: 'Inter', sans-serif;">${
                    sample[this.config.titleKey]
                  }</p>
                  <p style="margin-bottom: 8px; font-size: 14px; line-height: 21px; font-weight: 400; font-family: 'Inter', sans-serif;">${
                    sample[this.config.descriptionKey]
                  }</p>
                  <p style="margin-top: 12px; font-size: 12px; line-height: 16px; font-family: 'Inter', sans-serif; color: gray; font-weight: 300;">${
                    sample[this.config.subtitleKey]
                  }</p>
              </div>
          </div>
      </div>
      `

    const saveButton = this.shadow.getElementById("saveButton")
    saveButton.addEventListener("click", () => {
      this.callCustomEvent({
        action: "onsave",
        value: this.config.toJSON()
      })
    })

    const imageKeySelect = this.shadow.getElementById("imageKeySelect")
    imageKeySelect.addEventListener("change", () => {
      this.config.imageKey = imageKeySelect.value
      this.render()
    })

    const titleKeySelect = this.shadow.getElementById("titleKeySelect")
    titleKeySelect.addEventListener("change", () => {
      this.config.titleKey = titleKeySelect.value
      this.render()
    })

    const descriptionKeySelect = this.shadow.getElementById(
      "descriptionKeySelect"
    )

    descriptionKeySelect.addEventListener("change", () => {
      this.config.descriptionKey = descriptionKeySelect.value
      this.render()
    })

    const subtitleKeySelect = this.shadow.getElementById("subtitleKeySelect")
    subtitleKeySelect.addEventListener("change", () => {
      this.config.subtitleKey = subtitleKeySelect.value
      this.render()
    })
  }

  callCustomEvent(data) {
    const event = new CustomEvent("custom-change", {
      detail: data,
      bubbles: true, // If you want the event to bubble up through the DOM
      composed: true // Allows the event to pass through shadow DOM boundaries
    })

    this.dispatchEvent(event)
  }
}
