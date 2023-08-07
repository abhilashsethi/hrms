import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import PanelLayout from "layouts/panel";
import { useRef } from "react";
import EmailEditor from "react-email-editor";
import { RemoveRedEye, SendToMobile } from "@mui/icons-material";
import { useRouter } from "next/router";
import { MailTemplate } from "types";
import { useChange, useFetch } from "hooks";
import Swal from "sweetalert2";
import { Loader } from "components/core";

const EditTemplate = () => {
  const emailEditorRef = useRef<any>(null);
  const { push, query } = useRouter();
  const router = useRouter();
  const {
    data: template,
    mutate,
    isLoading,
  } = useFetch<any>(`mail-template/get-by-id/?templateId=${router?.query?.id}`);
  const onLoad = () => {
    emailEditorRef?.current?.editor?.loadDesign(
      template?.json ? JSON.parse(template?.json) : ``
    );
  };
  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };
  const { change } = useChange();
  const exportHtml = () => {
    emailEditorRef?.current?.editor?.exportHtml(async (data: any) => {
      const { html, design } = data;
      console.log({ data });
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "You want to save this template ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it.",
      });
      if (!isConfirmed) return;
      const res = await change(
        `mail-template?templateId=${router?.query?.id}`,
        {
          method: "PATCH",
          body: {
            content: html,
            json: JSON.stringify(design),
          },
        }
      );

      if (res.status !== 200) {
        Swal.fire(
          "Error",
          res?.results?.error?.message || "Unable to save email template",
          "error"
        );
        return;
      }
      mutate();
      router.push(`/admin/templates/saved-templates`);
      Swal.fire("Success!", "Template saved successfully!", "success");
    });
  };
  return (
    <PanelLayout title="Customize Template - University Panel">
      <section className="p-8">
        <div role="presentation" className="mb-8">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/panel/university">
              Home
            </Link>
            <Typography color="text.primary">Edit Template</Typography>
          </Breadcrumbs>
        </div>
        <div>
          <div className="flex justify-end font-semibold mb-3 gap-4">
            <button
              className="px-6 py-2 flex gap-2 items-center shadow-xl bg-theme text-white rounded-md text-sm hover:scale-105 ease-in-out transition-all duration-200"
              onClick={exportHtml}
            >
              <SendToMobile /> SAVE TEMPLATE
            </button>
            <button
              className="px-6 py-2 flex gap-2 items-center shadow-xl bg-emerald-600 text-white rounded-md text-sm hover:scale-105 ease-in-out transition-all duration-200"
              onClick={() => push(`/admin/templates/saved-templates`)}
            >
              <RemoveRedEye /> VIEW TEMPLATES
            </button>
          </div>
          <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <EmailEditor
              ref={emailEditorRef}
              onLoad={onLoad}
              onReady={onReady}
              appearance={{
                theme: "dark",
                panels: { tools: { dock: "right" } },
              }}
            />
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default EditTemplate;

const demoData = {
  counters: {
    u_row: 8,
    u_column: 13,
    u_content_menu: 1,
    u_content_text: 24,
    u_content_image: 8,
    u_content_button: 2,
    u_content_divider: 1,
    u_content_heading: 3,
  },
  body: {
    id: "0QFAKPxyzM",
    rows: [
      {
        id: "-Pm2fEb9Wp",
        cells: [1],
        columns: [
          {
            id: "aREOk3UC4g",
            contents: [
              {
                id: "hpEzy7mhvP",
                type: "image",
                values: {
                  containerPadding: "10px 10px 0px",
                  anchor: "",
                  src: {
                    url: "https://assets.unlayer.com/projects/139/1676495528722-apple_logo_circle_f5f5f7-000_2x.png",
                    width: 116,
                    height: 116,
                    maxWidth: "15%",
                    autoWidth: false,
                  },
                  textAlign: "center",
                  altText: "",
                  action: {
                    name: "web",
                    values: {
                      href: "",
                      target: "_blank",
                    },
                  },
                  hideDesktop: false,
                  displayCondition: null,
                  _meta: {
                    htmlID: "u_content_image_1",
                    htmlClassNames: "u_content_image",
                  },
                  selectable: true,
                  draggable: true,
                  duplicatable: true,
                  deletable: true,
                  hideable: true,
                  _override: {
                    mobile: {
                      src: {
                        maxWidth: "20%",
                        autoWidth: false,
                      },
                    },
                  },
                },
              },
              {
                id: "wQof8hV6QL",
                type: "heading",
                values: {
                  containerPadding: "0px",
                  anchor: "",
                  headingType: "h1",
                  fontWeight: 400,
                  fontSize: "48px",
                  color: "#ffffff",
                  textAlign: "center",
                  lineHeight: "140%",
                  linkStyle: {
                    inherit: true,
                    linkColor: "#0000ee",
                    linkHoverColor: "#0000ee",
                    linkUnderline: true,
                    linkHoverUnderline: true,
                  },
                  hideDesktop: false,
                  displayCondition: null,
                  _meta: {
                    htmlID: "u_content_heading_1",
                    htmlClassNames: "u_content_heading",
                  },
                  selectable: true,
                  draggable: true,
                  duplicatable: true,
                  deletable: true,
                  hideable: true,
                  text: "MacBook Pro",
                  _override: {
                    mobile: {
                      fontSize: "45px",
                    },
                  },
                },
              },
              {
                id: "tfkkYtjur9",
                type: "heading",
                values: {
                  containerPadding: "0px",
                  anchor: "",
                  headingType: "h2",
                  fontSize: "28px",
                  color: "#ffffff",
                  textAlign: "center",
                  lineHeight: "140%",
                  linkStyle: {
                    inherit: true,
                    linkColor: "#0000ee",
                    linkHoverColor: "#0000ee",
                    linkUnderline: true,
                    linkHoverUnderline: true,
                  },
                  hideDesktop: false,
                  displayCondition: null,
                  _meta: {
                    htmlID: "u_content_heading_2",
                    htmlClassNames: "u_content_heading",
                  },
                  selectable: true,
                  draggable: true,
                  duplicatable: true,
                  deletable: true,
                  hideable: true,
                  text: "Mover. Maker. Boundary breaker.",
                  _override: {
                    mobile: {
                      fontSize: "19px",
                    },
                  },
                },
              },
              {
                id: "7wzu4Z8K86",
                type: "text",
                values: {
                  containerPadding: "10px",
                  anchor: "",
                  fontSize: "17px",
                  textAlign: "center",
                  lineHeight: "140%",
                  linkStyle: {
                    inherit: true,
                    linkColor: "#0000ee",
                    linkHoverColor: "#0000ee",
                    linkUnderline: true,
                    linkHoverUnderline: true,
                  },
                  hideDesktop: false,
                  displayCondition: null,
                  _meta: {
                    htmlID: "u_content_text_2",
                    htmlClassNames: "u_content_text",
                  },
                  selectable: true,
                  draggable: true,
                  duplicatable: true,
                  deletable: true,
                  hideable: true,
                  text: '<p style="line-height: 140%;">From $1999 or $166.58/mo. for 12 mo.</p>',
                  _override: {
                    mobile: {
                      fontSize: "14px",
                    },
                  },
                },
              },
            ],
            values: {
              _meta: {
                htmlID: "u_column_1",
                htmlClassNames: "u_column",
              },
              border: {},
              padding: "0px",
              backgroundColor: "",
            },
          },
        ],
        values: {
          displayCondition: null,
          columns: false,
          backgroundColor: "",
          columnsBackgroundColor: "",
          backgroundImage: {
            url: "",
            fullWidth: true,
            repeat: "no-repeat",
            size: "custom",
            position: "center",
          },
          padding: "0px",
          anchor: "",
          hideDesktop: false,
          _meta: {
            htmlID: "u_row_1",
            htmlClassNames: "u_row",
          },
          selectable: true,
          draggable: true,
          duplicatable: true,
          deletable: true,
          hideable: true,
        },
      },
      {
        id: "A-f41NTazI",
        cells: [1, 1],
        columns: [
          {
            id: "SfLBIwDbWU",
            contents: [
              {
                id: "vjfsdzgJRX",
                type: "button",
                values: {
                  containerPadding: "10px",
                  anchor: "",
                  href: {
                    name: "web",
                    values: {
                      href: "",
                      target: "_blank",
                    },
                  },
                  buttonColors: {
                    color: "#FFFFFF",
                    backgroundColor: "#0071e3",
                    hoverColor: "#FFFFFF",
                    hoverBackgroundColor: "#3AAEE0",
                  },
                  size: {
                    autoWidth: true,
                    width: "100%",
                  },
                  fontSize: "17px",
                  textAlign: "right",
                  lineHeight: "120%",
                  padding: "10px 20px",
                  border: {},
                  borderRadius: "25px",
                  hideDesktop: false,
                  displayCondition: null,
                  _meta: {
                    htmlID: "u_content_button_2",
                    htmlClassNames: "u_content_button",
                  },
                  selectable: true,
                  draggable: true,
                  duplicatable: true,
                  deletable: true,
                  hideable: true,
                  text: '<span style="line-height: 20.4px;">Buy</span>',
                  calculatedWidth: 69,
                  calculatedHeight: 40,
                  _override: {
                    mobile: {
                      textAlign: "center",
                    },
                  },
                },
              },
            ],
            values: {
              _meta: {
                htmlID: "u_column_2",
                htmlClassNames: "u_column",
              },
              border: {},
              padding: "0px",
              borderRadius: "0px",
              backgroundColor: "",
            },
          },
          {
            id: "oHGVnfFNrL",
            contents: [
              {
                id: "X9LHO8t95H",
                type: "text",
                values: {
                  containerPadding: "20px",
                  anchor: "",
                  fontSize: "17px",
                  color: "#0071e3",
                  textAlign: "left",
                  lineHeight: "140%",
                  linkStyle: {
                    inherit: true,
                    linkColor: "#0000ee",
                    linkHoverColor: "#0000ee",
                    linkUnderline: true,
                    linkHoverUnderline: true,
                  },
                  hideDesktop: false,
                  displayCondition: null,
                  _meta: {
                    htmlID: "u_content_text_3",
                    htmlClassNames: "u_content_text",
                  },
                  selectable: true,
                  draggable: true,
                  duplicatable: true,
                  deletable: true,
                  hideable: true,
                  text: '<p style="line-height: 140%;">Learn more </p>',
                  _override: {
                    mobile: {
                      textAlign: "center",
                    },
                  },
                },
              },
            ],
            values: {
              _meta: {
                htmlID: "u_column_3",
                htmlClassNames: "u_column",
              },
              border: {},
              padding: "0px",
              borderRadius: "0px",
              backgroundColor: "",
            },
          },
        ],
        values: {
          displayCondition: null,
          columns: false,
          backgroundColor: "",
          columnsBackgroundColor: "",
          backgroundImage: {
            url: "",
            fullWidth: true,
            repeat: "no-repeat",
            size: "custom",
            position: "center",
          },
          padding: "0px",
          anchor: "",
          hideDesktop: false,
          _meta: {
            htmlID: "u_row_2",
            htmlClassNames: "u_row",
          },
          selectable: true,
          draggable: true,
          duplicatable: true,
          deletable: true,
          hideable: true,
        },
      },
      {
        id: "Rd4HAvqb8t",
        cells: [1],
        columns: [
          {
            id: "_t6kskqCwL",
            contents: [
              {
                id: "AF8ZpW__0i",
                type: "image",
                values: {
                  containerPadding: "0px",
                  anchor: "",
                  src: {
                    url: "https://assets.unlayer.com/projects/139/1676495949571-hero_2x.jpg",
                    width: 1424,
                    height: 880,
                  },
                  textAlign: "center",
                  altText: "",
                  action: {
                    name: "web",
                    values: {
                      href: "",
                      target: "_blank",
                    },
                  },
                  hideDesktop: false,
                  displayCondition: null,
                  _meta: {
                    htmlID: "u_content_image_2",
                    htmlClassNames: "u_content_image",
                  },
                  selectable: true,
                  draggable: true,
                  duplicatable: true,
                  deletable: true,
                  hideable: true,
                },
              },
            ],
            values: {
              _meta: {
                htmlID: "u_column_4",
                htmlClassNames: "u_column",
              },
              border: {},
              padding: "0px",
              borderRadius: "0px",
              backgroundColor: "",
            },
          },
        ],
        values: {
          displayCondition: null,
          columns: false,
          backgroundColor: "",
          columnsBackgroundColor: "",
          backgroundImage: {
            url: "",
            fullWidth: true,
            repeat: "no-repeat",
            size: "custom",
            position: "center",
          },
          padding: "15px 15px 70px",
          anchor: "",
          hideDesktop: false,
          _meta: {
            htmlID: "u_row_3",
            htmlClassNames: "u_row",
          },
          selectable: true,
          draggable: true,
          duplicatable: true,
          deletable: true,
          hideable: true,
        },
      },
    ],
    values: {
      popupPosition: "center",
      popupWidth: "600px",
      popupHeight: "auto",
      borderRadius: "10px",
      contentAlign: "center",
      contentVerticalAlign: "center",
      contentWidth: 700,
      fontFamily: {
        label: "Helvetica",
        value: "helvetica,sans-serif",
        url: "",
        weights: null,
        defaultFont: true,
      },
      textColor: "#ffffff",
      popupBackgroundColor: "#FFFFFF",
      popupBackgroundImage: {
        url: "",
        fullWidth: true,
        repeat: "no-repeat",
        size: "cover",
        position: "center",
      },
      popupOverlay_backgroundColor: "rgba(0, 0, 0, 0.1)",
      popupCloseButton_position: "top-right",
      popupCloseButton_backgroundColor: "#DDDDDD",
      popupCloseButton_iconColor: "#000000",
      popupCloseButton_borderRadius: "0px",
      popupCloseButton_margin: "0px",
      popupCloseButton_action: {
        name: "close_popup",
        attrs: {
          onClick:
            "document.querySelector('.u-popup-container').style.display = 'none';",
        },
      },
      backgroundColor: "#000000",
      backgroundImage: {
        url: "",
        fullWidth: true,
        repeat: "no-repeat",
        size: "custom",
        position: "center",
      },
      preheaderText: "",
      linkStyle: {
        body: true,
        linkColor: "#0071e3",
        linkHoverColor: "#0000ee",
        linkUnderline: true,
        linkHoverUnderline: true,
        inherit: false,
      },
      _meta: {
        htmlID: "u_body",
        htmlClassNames: "u_body",
      },
    },
  },
  schemaVersion: 12,
};
