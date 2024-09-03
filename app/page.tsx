import Block from './components/Block'

export default function Home() {
  return (
    <div className="w-[87.5%] max-w-[87.5%]">
      <Block type="title" placeholder="Untitled" />
      <Block type="h1" placeholder="Heading 1" />
      <Block type="h2" placeholder="Heading 2" />
      <Block type="h3" placeholder="Heading 3" />
      <Block />
    </div>
  );
}
