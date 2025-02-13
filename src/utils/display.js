import chalk from 'chalk';
import gradient from 'gradient-string';
import Table from 'cli-table3';
import moment from 'moment-timezone';
import figlet from 'figlet';

class Display {
  constructor() {
    this.initUI();
  }

  initUI() {
    this.displayTitle();
  }

  displayTitle() {
    const titleGradient = gradient(['#00FF88', '#00D8FF', '#0066FF']);

    const banner = `
fractionai 自动化机器人 v2.1.0`;

    console.log(
      titleGradient(
        figlet.textSync('fractionai', {
          font: 'Slant',
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })
      )
    );

    console.log(titleGradient(banner));

    console.log(
      chalk.bgHex('#1A1A1A').hex('#00FF88')(' 加入我们：电报频道：https://t.me/ksqxszq ') +
      chalk.hex('#00FF88')('  v2.1.0') +
      '\n' +
      chalk.hex('#2A2A2A')('━'.repeat(50)) + '\n' +
      chalk.hex('#00FF88')('推特：@qklxsqf') + '\n' +
      chalk.hex('#2A2A2A')('━'.repeat(50))
    );

    console.log(chalk.hex('#A9A9A9')(
      `启动于 ${new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })}`
    ));

    console.log(chalk.hex('#2A2A2A')('━'.repeat(50)) + '\n');
  }

  updateWallet(data) {
    if (!data) return;

    const table = new Table({
      head: [chalk.hex('#00FFEE')('Property'), chalk.hex('#00FFEE')('Value')],
      colWidths: [15, 25],
      style: { head: [], border: [] }
    });

    table.push(
      [chalk.hex('#7ED8F8')('Address'), this.formatAddress(data.address)],
      [chalk.hex('#7ED8F8')('Balance'), this.formatBalance(data.balance?.ETH)],
      [chalk.hex('#7ED8F8')('Network'), 'Sepolia'],
      [chalk.hex('#7ED8F8')('Last Update'), moment().format("HH:mm:ss")]
    );

    console.log(table.toString());
  }

  formatAddress(address) {
    if (!address) return chalk.red('Not Connected');
    return chalk.hex('#7ED8F8')(`${address.slice(0, 6)}...${address.slice(-4)}`);
  }

  formatBalance(balance) {
    if (!balance) return chalk.red('0.00000000 ETH');
    return chalk.hex('#FFD700')(`${parseFloat(balance).toFixed(8)} ETH`);
  }

  updateAgents(agents = [], activeMatches = {}) {
    const table = new Table({
      head: [
        chalk.hex('#00FFEE')('Agent'),
        chalk.hex('#00FFEE')('Status'),
        chalk.hex('#00FFEE')('ROI'),
        chalk.hex('#00FFEE')('Score'),
        chalk.hex('#00FFEE')('Sessions')
      ],
      colWidths: [16, 8, 8, 8, 8],
      style: { head: [], border: [] }
    });

    if (agents.length === 0) {
      table.push(['No Agents', 'N/A', 'N/A', 'N/A', 'N/A']);
    } else {
      agents.forEach(agent => {
        table.push([
          chalk.hex('#7ED8F8')(this.truncateString(agent.name, 14)),
          activeMatches[agent.id] ? chalk.green('In Match') : chalk.yellow('Ready'),
          this.formatROI(agent.stats.roi),
          this.formatAvgScore(agent.stats.avgScore),
          chalk.hex('#FFD700')(agent.stats.totalSessions.toString())
        ]);
      });
    }

    console.log(table.toString());
  }

  formatROI(roi) {
    if (typeof roi !== 'number') return chalk.red('N/A');
    return chalk.hex(roi >= 0 ? '#00FF88' : '#FF0000')(`${roi >= 0 ? '+' : ''}${roi.toFixed(2)}%`);
  }

  formatAvgScore(score) {
    if (typeof score !== 'number') return chalk.red('N/A');
    return chalk.hex('#FFD700')(score.toFixed(1));
  }

  updateFractalInfo(data) {
    if (!data) return;

    const table = new Table({
      head: [chalk.hex('#00FFEE')('Property'), chalk.hex('#00FFEE')('Value')],
      colWidths: [15, 15],
      style: { head: [], border: [] }
    });

    table.push(
      [chalk.hex('#7ED8F8')('Total Fractals'), this.formatNumber(data.userFractals)],
      [chalk.hex('#7ED8F8')('Daily Fractals'), this.formatNumber(data.dailyFractals)],
      [chalk.hex('#7ED8F8')('Current Rank'), data.fractalRank?.currentRank || 'N/A'],
      [chalk.hex('#7ED8F8')('Next Rank'), data.fractalRank?.nextRank || 'N/A'],
      [chalk.hex('#7ED8F8')('Progress'), this.formatProgress(data.fractalRank)]
    );

    console.log(table.toString());
  }

  formatNumber(value) {
    if (!value) return chalk.red('0.00');
    return chalk.hex('#FFD700')(parseFloat(value).toFixed(2));
  }

  formatProgress(rankData) {
    if (!rankData) return chalk.red('0.0%');
    const progress =
      (rankData.currentFractal / rankData.fractalNeededForNextRank) * 100;
    return chalk.hex('#00FF88')(`${progress.toFixed(1)}%`);
  }

  truncateString(str, length) {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length - 3) + '...';
  }

  static formatError(message) {
    if (typeof message !== 'string') return message;

    if (message.includes('<!DOCTYPE html>')) {
      return chalk.red('Error: Invalid API Response');
    }

    if (message.includes('maximum number of sessions')) {
      const matches = message.match(
        /User has reached maximum number of sessions:\s*(\d+)\s*for the hour/
      );
      if (matches) {
        return chalk.yellow(`Session limit reached: ${matches[1]} sessions per hour`);
      }
    }

    if (message.includes('POST /') || message.includes('GET /')) {
      return null;
    }

    if (message.includes('Error Response:')) {
      try {
        const jsonStart = message.indexOf('{');
        const jsonStr = message.slice(jsonStart);
        const jsonObj = JSON.parse(jsonStr);
        return chalk.red(`Error: ${jsonObj.error || 'Unknown error'}`);
      } catch {
        return message;
      }
    }

    return message;
  }

  static log(message) {
    if (!message) return;

    if (global.display) {
      const time = moment().format('HH:mm:ss');
      const formattedMessage = Display.formatError(message);

      if (formattedMessage) {
        console.log(`[${chalk.hex('#A9A9A9')(time)}] ${formattedMessage}`);
      }
    } else {
      console.log(`[${chalk.hex('#A9A9A9')(moment().format('HH:mm:ss'))}] ${message}`);
    }
  }
}

let displayInstance = null;

export default {
  init() {
    if (!displayInstance) {
      displayInstance = new Display();
      global.display = displayInstance;
    }
    return displayInstance;
  },
  log: Display.log,
  getInstance() {
    return displayInstance;
  },
};