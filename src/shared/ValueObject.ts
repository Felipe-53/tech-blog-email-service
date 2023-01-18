export abstract class ValueObject<Props> {
  protected readonly props: Props;

  constructor(props: Props) {
    this.props = props;
  }
}
