import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EditorPage extends BasePage {
  private titleInput = 'Article Title';
  private aboutInput = "What's this article about?";
  private contentInput = 'Write your article (in';
  private tagInput = 'Enter tags';
  private publishButton = { name: 'Publish Article' };

  constructor(page: Page) {
    super(page);
  }

  async navigateTo(slug?: string) {
    await super.navigateTo(`/editor/${slug}`);
  }

  async isOpen(slug?: string) {
    await this.page.waitForURL(`/editor/${slug}`);
  }

  async fillTitle(title: string) {
    await this.page.getByPlaceholder(this.titleInput).fill(title);
  }

  async fillAbout(about: string) {
    await this.page.getByPlaceholder(this.aboutInput).fill(about);
  }
  async fillContent(content: string) {
    await this.page.getByPlaceholder(this.contentInput).fill(content);
  }

  async addTags(tags: string[]) {
    await this.page.getByPlaceholder(this.tagInput).fill(tags.join(' '));
  }

  async publish() {
    await this.page.getByRole('button', this.publishButton).click();
  }

  async create({
    title = '',
    about = '',
    content = '',
    tags = []
  }: {
    title?: string;
    about?: string;
    content?: string;
    tags?: string[];
  }) {
    await this.page.getByRole('link', { name: 'New Post' }).click();
    await this.fillTitle(title);
    await this.fillAbout(about);
    await this.fillContent(content);
    await this.addTags(tags);
    await this.publish();
  }

  async edit(slug: string, content: string) {
    await this.page.goto(`/article/${slug}`);
    await this.page
      .getByRole('button', { name: 'Edit Article' })
      .first()
      .click();
    await this.isOpen(slug);
    this.fillContent(content);
    await this.publish();
  }
}
