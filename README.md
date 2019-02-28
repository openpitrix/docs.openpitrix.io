# Official website for [OpenPitrix](https://github.com/openpitrix/openpitrix)

[![Build Status](https://travis-ci.org/openpitrix/website.svg)](https://travis-ci.org/openpitrix/website)
[![docker build](https://img.shields.io/docker/build/openpitrix/website.svg)](https://cloud.docker.com/u/openpitrix/repository/docker/openpitrix/website/tags)

## Develop

```shell
git clone https://github.com/openpitrix/website.git
cd website
yarn
yarn dev
```

## Run

```bash
docker pull openpitrix/website
docker run -d --rm -p 80:80 --name op-website openpitrix/website
```

## Contribute

Tree of repo:

```bash
├── docs                                            // docs root directory
│   ├── v0.3                                        // docs version
│   │   ├── en                                      // docs language 
│   │   │   └── installation                        // docs module
|   |   |       └── installation-guide.md           // document
│   │   └── zh-CN
│   │       └── installation
|   |           └── installation-guide.md 
│   ├── toc_v0.3_en.json                            // table of contents, define the page navigation
│   └── toc_v0.3_zh-CN.json
├── src
└── static                                          // put document images here
    └── create-repo.png
```

If you want to edit the document, you can follow the ways below:

### Add new version
 
1. Create a new directory called the new version name under the ``docs`` directory

```shell
cd docs && mkdir version-xxxx
```

2. Create subdirectories for each language you want to support

```shell
cd docs/version-xxxx && mkdir -p zh-CN en
```

3. Create navigation files for each language of the new version under the ``docs`` directory

```shell
cd docs

touch toc_version-xxx_en.json toc_version-xxx_zh-CN.json
```

### Edit navigation

navigation file example

- id: should match the format of ``{version}-{language}``
- chapters: nav items
- title: nav title
- entry: nav entry, path to the document to display
- entries: sub navs

```json
{
  "id": "v0.3-zh-CN",
  "chapters": [
    {
      "title": "简介",
      "entry": "./v0.3/zh-CN/introduction/basic.md"
    },
    {
      "title": "安装指南",
      "chapters": [
        {
          "title": "部署模式",
          "entries": [
            {
              "entry": "./v0.3/zh-CN/installation/installation-guide.md"
            },
            {
              "entry": "./v0.3/zh-CN/installation/allinone.md"
            },
            {
              "entry": "./v0.3/zh-CN/installation/kubernetes.md"
            }
          ]
        }
      ]
    }
  ]
}
```

### Edit Document

document example

```

---
  title: 'document title, will show in nav'
---

  ## title 1

  content 1

  ![](/image.png) 

  this path will request `/static/image.png`

  ## title 2

  ### subtitle 2.1
    content 2.1
  
  ### title 3

  `##` will be transformed to an anchor of the page, and will show in the nav.
```


## License

Apache 2