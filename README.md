# FractionAI-BOT - Fraction AI Battle Bot

A bot for automating battles in Fraction AI game.

## Features

- Auto Match Making
- Multiple Wallet Support
- Clean UI Dashboard
- Easy to Configure

## Requirements

- Node.js v18+
- npm or yarn
- Ethereum Wallet with Sepolia ETH

## Installation

1. Clone this repository

```bash
git clone https://github.com/ziqing888/fractionai-bot

cd fractionai-bot
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Edit `data.txt` file and input your private keys (one per line)

```
your_private_key
```

4. Edit `config.json` file

```json
{
  "fee": 0.01,
  "antiCaptchaKey": "your_anti_captcha_key",
  "twoCaptchaKey": "your_2captcha_api_key",
  "geminiApiKey": "your_gemini_api_key",
  "defaultSolver": "twocaptcha",
  "pollingInterval": 10,
  "retryDelay": 10000,
  "maxRetries": 3
}
```

Notes:

Available entry fees: 0.01, 0.001, 0.0001 ETH

Available solvers: anticaptcha, twocaptcha, gemini

At least one solver API key must be provided

Polling interval only used for 2Captcha solver

## Required Services

Choose Your Captcha Solver

Option 1: 2Captcha (Recommended)

Register at 2Captcha

Get your API key

Add the API key as twoCaptchaKey in config.json

Set defaultSolver to "twocaptcha"

Optionally adjust pollingInterval (default: 10 seconds)

Option 2: Anti-Captcha

Register at Anti-Captcha

Get your API key

Add the API key as antiCaptchaKey in config.json

Set defaultSolver to "anticaptcha"

Option 3: Gemini AI

Get your Gemini API key from Google AI Studio

Add the API key as geminiApiKey in config.json

Set defaultSolver to "gemini"

## Usage

1. Run the bot

```bash
npm start
# or
yarn start
```



## Before Running

1. Register at [Fraction AI](https://dapp.fractionai.xyz/?referral=28E4C6D8)
2. Create your agent
3. Make sure you have enough Sepolia ETH
4. Configure your settings in `config.json`

## Warning

- Use at your own risk
- Only use test wallet, never use your main wallet
- Make sure you understand what you're doing

# 中文说明
### 克隆仓库

```bash
git clone https://github.com/ziqing888/fractionai-bot

cd fractionai-bot
```
### 安装依赖
```bash
npm install
# or
yarn install
```
### 编辑 data.txt 文件并输入你的私钥（每行一个）
```
your_private_key
```
### 编辑 config.json 文件
```json
{
  "fee": 0.01,
  "antiCaptchaKey": "your_anti_captcha_key",
  "twoCaptchaKey": "your_2captcha_api_key",
  "geminiApiKey": "your_gemini_api_key",
  "defaultSolver": "twocaptcha",
  "pollingInterval": 10,
  "retryDelay": 10000,
  "maxRetries": 3
}

```
注意事项：

可用的入场费用：0.01，0.001，0.0001 ETH

可用的解算器：anticaptcha，twocaptcha，gemini

必须提供至少一个解算器的 API 密钥

pollingInterval 仅适用于 2Captcha 解算器

所需服务

选择你的验证码解算器

选项 1：2Captcha（推荐）

在 [2Captcha](https://2captcha.com/) 注册

获取你的 API 密钥

将 API 密钥添加为 twoCaptchaKey 在 config.json 中

将 defaultSolver 设置为 "twocaptcha"

可选：调整 pollingInterval（默认：10 秒）

选项 2：Anti-Captcha

在 [Anti-Captcha](https://anti-captcha.com/) 注册

获取你的 API 密钥

将 API 密钥添加为 antiCaptchaKey 在 config.json 中

将 defaultSolver 设置为 "anticaptcha"

选项 3：Gemini AI

从 [Google AI Studio ](https://aistudio.google.com/app/apikey)获取你的 Gemini API 密钥

将 API 密钥添加为 geminiApiKey 在 config.json 中

将 defaultSolver 设置为 "gemini"

## 运行机器人
```bash
npm start
# or
yarn start
```
在运行之前
1. 在 [Fraction AI](https://dapp.fractionai.xyz/?referral=28E4C6D8) 注册
2. 创建你的代理
3. 确保你有足够的 Sepolia ETH
4. 配置 config.json 中的设置
警告
- 使用风险自负
- 仅使用测试钱包，切勿使用主钱包
- 确保你了解自己在做什么

